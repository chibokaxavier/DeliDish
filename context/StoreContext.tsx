"use client";
import axios from "axios";
import { Toast } from "primereact/toast";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface ProviderProps {
  children: ReactNode;
}

interface FoodItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Define the structure of your store context
interface StoreContextType {
  food_list: FoodItem[];
  cartItems: { [key: string]: CartItem }; // Cart items are now full CartItem objects
  setCartItems: Dispatch<SetStateAction<{ [key: string]: CartItem }>>;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  getTotalCartAmount: () => number;
  token: string | null;
  userEmail: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  setUserEmail: Dispatch<SetStateAction<string | null>>;
  loading: boolean;
  count: number | null;
  setCount: Dispatch<SetStateAction<number | null>>;
}

export const StoreContext = createContext<StoreContextType | null>(null);

export const StoreContextProvider = ({ children }: ProviderProps) => {
  const url = "http://localhost:4000";
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [food_list, setFoodList] = useState<FoodItem[]>([]);
  // Load initial cartItems from localStorage if available
  const [cartItems, setCartItems] = useState<{ [key: string]: CartItem }>(
    () => {
      if (typeof window !== "undefined") {
        const storedCart = localStorage.getItem("cartItems");
        return storedCart ? JSON.parse(storedCart) : {};
      }
      return {};
    }
  );
  const toast = useRef<Toast>(null); 

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  });

  const [userEmail, setUserEmail] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userEmail");
    }
    return null;
  });
  const [visible, setVisible] = useState(false);

  const fetchCartData = async () => {
    if (token) {
      const res = await axios.get(`${url}/api/cart/get`, {
        headers: { token },
      });
      if (res.data.success) {
        setCartItems(res.data.data);
      }
    }
  };
  const addToCart = async (itemId: string) => {
    const item = food_list.find((food) => food._id === itemId);
    if (!item) {
      console.error(`Item with id ${itemId} not found`);
      return;
    }
  
    // Optimistically update the UI
    setCartItems((prev) => {
      const existingItem = prev[item._id];
  
      return {
        ...prev,
        [item._id]: {
          id: item._id,
          name: item.name,
          price: item.price,
          quantity: existingItem ? existingItem.quantity + 1 : 1, // Update quantity or add new item
        },
      };
    });
  
    // Perform the API call
    try {
      if (token) {
        const res = await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
        if (res.data.success) {
          showSuccess("Item added to cart");
        } else {
          throw new Error("Failed to add to cart");
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
  
      // Revert optimistic update if the API call fails
      setCartItems((prev) => {
        const existingItem = prev[item._id];
        if (existingItem && existingItem.quantity > 1) {
          return {
            ...prev,
            [item._id]: { ...existingItem, quantity: existingItem.quantity - 1 },
          };
        } else {
          const updatedCart = { ...prev };
          delete updatedCart[item._id];
          return updatedCart;
        }
      });
    }
  };
  
  

  const removeFromCart = async (itemId: string) => {
    const existingItem = cartItems[itemId];
    if (!existingItem) return;
  
    // Optimistically update the UI
    setCartItems((prev) => {
      if (existingItem.quantity > 1) {
        return {
          ...prev,
          [itemId]: { ...existingItem, quantity: existingItem.quantity - 1 },
        };
      } else {
        const updatedCart = { ...prev };
        delete updatedCart[itemId];
        return updatedCart;
      }
    });
  
    // Perform the API call
    try {
      if (token) {
        const res = await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { token } }
        );
        if (res.data.success) {
          showSuccess("Item removed from cart");
        } else {
          throw new Error("Failed to remove from cart");
        }
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
  
      // Revert optimistic update if the API call fails
      setCartItems((prev) => {
        return {
          ...prev,
          [itemId]: { ...existingItem, quantity: existingItem.quantity + 1 },
        };
      });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const cartItem = cartItems[itemId];
      if (cartItem.quantity > 0) {
        const itemInfo = food_list.find((product) => product._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItem.quantity;
        }
      }
    }
    return totalAmount;
  };
  const fetchFood = async () => {
    const res = await axios.get(`${url}/api/food/list`);
    if (res.data.success) {
      setFoodList(res.data.data);
    } else {
    }
  };
  // const fetchCartData = async () => {
  //   const res = await axios.get(`${url}/api/cart/get`);
  //   if (res.data.success) {
  //     setCartItems(res.data.data);
  //   } else {
  //   }
  // };

  const showSuccess = (message:any) => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };

  // Save cartItems to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    setLoading(false);
    fetchFood();
    fetchCartData();
  }, []);
  const contextValue: StoreContextType = {
    food_list,
    count,
    setCount,
    cartItems,
    setCartItems,
    addToCart,
    loading,
    removeFromCart,
    visible,
    token,
    setToken,
    userEmail,
    setUserEmail,
    setVisible,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
      <Toast ref={toast} />
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error(
      "useStoreContext must be used within a StoreContextProvider"
    );
  }
  return context;
};

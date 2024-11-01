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

export interface FoodItem {
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
  fetchCartData: () => Promise<void>;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  getTotalCartAmount: () => number;
  token: string | null;
  userEmail: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  setUserEmail: Dispatch<SetStateAction<string | null>>;
  loading: boolean;
  foodLoading: boolean;
  setFoodLoading: Dispatch<SetStateAction<boolean>>;
  count: number | null;
  setCount: Dispatch<SetStateAction<number | null>>;
}

export const StoreContext = createContext<StoreContextType | null>(null);

export const StoreContextProvider = ({ children }: ProviderProps) => {
  const url = "http://localhost:4000";
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [foodLoading, setFoodLoading] = useState(false);
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
      try {
        const res = await axios.get(`${url}/api/cart/get`, {
          headers: { token },
        });
        if (res.data.success) {
          const backendCart = res.data.data;

          // Create a new cart to hold merged items
          const mergedCart: { [key: string]: CartItem } = {};

          // Start with items from the backend
          for (const itemId in backendCart) {
            mergedCart[itemId] = { ...backendCart[itemId] }; // Copy backend item
          }

          // Add items from local storage, summing quantities if they exist in the backend
          for (const itemId in cartItems) {
            if (mergedCart[itemId]) {
              // If the item exists in both, check quantities
              const backendQuantity = mergedCart[itemId].quantity;
              const localQuantity = cartItems[itemId].quantity;

              // Only sum quantities if they are different
              if (backendQuantity !== localQuantity) {
                mergedCart[itemId].quantity += localQuantity;
              }
            } else {
              // If it's only in local, add it to the merged cart
              mergedCart[itemId] = cartItems[itemId];
            }
          }

          // Sync merged cart back to the backend
          await syncCartToBackend(mergedCart);

          // Update state with the merged cart
          setCartItems(mergedCart);
        }
      } catch (error) {
        console.error("Error fetching cart data from backend:", error);
      }
    }
  };

  // Sync the merged cart back to the backend
  const syncCartToBackend = async (mergedCart: { [key: string]: CartItem }) => {
    try {
      if (token) {
        const res = await axios.post(
          `${url}/api/cart/sync`,
          { cartItems: mergedCart },
          { headers: { token } }
        );
        if (!res.data.success) {
          throw new Error("Failed to sync cart");
        }
      }
    } catch (error) {
      console.error("Error syncing cart with backend:", error);
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
            [item._id]: {
              ...existingItem,
              quantity: existingItem.quantity - 1,
            },
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
          showError("Item removed from cart");
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
    setFoodLoading(true);
    const res = await axios.get(`${url}/api/food/list`);
    if (res.data.success) {
      setFoodList(res.data.data);
      setFoodLoading(false);
    }
  };

  const showSuccess = (message: any) => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };
  const showError = (message: any) => {
    toast.current?.show({
      severity: "error",
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
    //  fetchCartData();
  }, []);
  useEffect(() => {
    fetchCartData();
  }, [token]);
  const contextValue: StoreContextType = {
    food_list,
    count,
    setCount,
    cartItems,
    setCartItems,
    fetchCartData,
    addToCart,
    loading,
    setFoodLoading,
    foodLoading,
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

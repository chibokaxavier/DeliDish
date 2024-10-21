"use client";
import axios from "axios";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
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
}

export const StoreContext = createContext<StoreContextType | null>(null);

export const StoreContextProvider = ({ children }: ProviderProps) => {
  const url = "http://localhost:4000";
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

  const addToCart = async (itemId: string) => {
    const item = food_list.find((food) => food._id === itemId);
    if (!item) {
      console.error(`Item with id ${itemId} not found`);
      return;
    }

    setCartItems((prev) => {
      const existingItem = prev[item._id];

      if (existingItem) {
        // Update quantity if item already exists
        return {
          ...prev,
          [item._id]: {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          },
        };
      } else {
        // Add new item to cart
        return {
          ...prev,
          [item._id]: {
            id: item._id,
            name: item.name,
            price: item.price,
            quantity: 1, // Set initial quantity to 1
          },
        };
      }
    });
    if (token) {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId: string) => {
    setCartItems((prev) => {
      const existingItem = prev[itemId];

      if (existingItem && existingItem.quantity > 1) {
        // Decrease quantity if it's more than 1
        return {
          ...prev,
          [itemId]: {
            ...existingItem,
            quantity: existingItem.quantity - 1,
          },
        };
      } else {
        // Remove item if quantity becomes 0
        const updatedCart = { ...prev };
        delete updatedCart[itemId];
        return updatedCart;
      }
    });
    if (token) {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
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

  // Save cartItems to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    setLoading(false);
    fetchFood();
  }, []);
  const contextValue: StoreContextType = {
    food_list,
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

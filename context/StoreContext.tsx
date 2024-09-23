"use client";
import { food_list } from "@/public/assets";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface ProviderProps {
  children: ReactNode;
}

interface FoodItem {
  _id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Define the structure of your store context
interface StoreContextType {
  food_list: FoodItem[];
  cartItems: { [key: number]: CartItem }; // Cart items are now full CartItem objects
  setCartItems: Dispatch<SetStateAction<{ [key: number]: CartItem }>>;
  addToCart: (itemId: number) => void;
  removeFromCart: (itemId: number) => void;
}

export const StoreContext = createContext<StoreContextType | null>(null);

export const StoreContextProvider = ({ children }: ProviderProps) => {
  const [cartItems, setCartItems] = useState<{ [key: number]: CartItem }>({});

  const addToCart = (itemId: number) => {
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
  };

  const removeFromCart = (itemId: number) => {
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
  };

  useEffect(()=>{
console.log(cartItems);
  },[cartItems])
  
  const contextValue: StoreContextType = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
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
    throw new Error("useStoreContext must be used within a StoreContextProvider");
  }
  return context;
};
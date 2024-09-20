"use client";
import { food_list } from "@/public/assets";
import { createContext, ReactNode, useContext } from "react";

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

// Define the structure of your store context
interface StoreContextType {
  food_list: FoodItem[]; // food_list is an array of food items
}
export const StoreContext = createContext<StoreContextType | null>(null);
export const StoreContextProvider = ({ children }: ProviderProps) => {
  const contextValue: StoreContextType = {
    food_list,
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

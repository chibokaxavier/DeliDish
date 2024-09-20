"use client";
import { StoreContext, useStoreContext } from "@/context/StoreContext";
import React, { useContext } from "react";

interface CategoryProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const FoodDisplay = ({ category, setCategory }: CategoryProps) => {
  const { food_list } = useStoreContext();
  return (
    <div>
      <h2>Top dishes near you</h2>
      {food_list.map((item, index) => {
        return <div>gh</div>;
      })}
    </div>
  );
};

export default FoodDisplay;

"use client";
import { StoreContext, useStoreContext } from "@/context/StoreContext";
import React, { useContext } from "react";
import FoodItem from "./FoodItem";

interface CategoryProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const FoodDisplay = ({ category, setCategory }: CategoryProps) => {
  const { food_list } = useStoreContext();
  return (
    <div className="mt-7">
      <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
        Top dishes near you
      </h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4   mt-7 gap-7 mb-7">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;

"use client";
import {  useStoreContext } from "@/context/StoreContext";
import React from "react";
import FoodItem from "./FoodItem";
import { Skeleton } from "@nextui-org/react";

interface CategoryProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const FoodDisplay = ({ category }: CategoryProps) => {
  const { food_list, foodLoading } = useStoreContext();
  return (
    <div className="mt-7">
      <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
        Top dishes near you
      </h2>
      {foodLoading ? (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4   mt-7 gap-7 mb-10">
          <Skeleton className="h-[400px] lg:w-[300px] rounded-3xl" />{" "}
          <Skeleton className="h-[400px] lg:w-[300px] rounded-3xl" />{" "}
          <Skeleton className="h-[400px] lg:w-[300px] rounded-3xl" />{" "}
          <Skeleton className="h-[400px] lg:w-[300px] rounded-3xl" />
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4   mt-7 gap-7 mb-10">
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
      )}
    </div>
  );
};

export default FoodDisplay;

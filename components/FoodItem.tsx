"use client";
import { Rating } from "primereact/rating";
import React, { useState } from "react";
import { CiStar } from "react-icons/ci";
import { TbStarFilled } from "react-icons/tb";
interface FoodItemProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const FoodItem = ({ id, name, price, description, image }: FoodItemProps) => {
  const [value, setValue] = useState<number | undefined >(0);
  return (
    <div className=" rounded-2xl shadow-stone-300 shadow-md animate-appearance-in transition duration-500">
      <div>
        <img src={image} alt="" className="w-full rounded-t-2xl" />
      </div>
      <div className="p-5">
        <div>
          <p>{name}</p>
          {/* <img src={assets.rat} alt="" /> */}
          <div className="flex gap-1">
            {" "}
            <Rating value={value} onChange={(e) => setValue(e.value ?? undefined)} cancel={false}  className="text-6xl text-blue-600 py-2"  />
          </div>
        </div>
        <p>{description}</p>
        <p>${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;

"use client";
import { Rating } from "primereact/rating";
import React, { useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaMinus, FaPlus } from "react-icons/fa";
import { TbStarFilled } from "react-icons/tb";
interface FoodItemProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const FoodItem = ({ id, name, price, description, image }: FoodItemProps) => {
  const [value, setValue] = useState<number | undefined>(0);
  const [count, setCount] = useState(0);

  return (
    <div className="food-item rounded-2xl shadow-stone-300 shadow-md animate-appearance-in transition duration-500">
      <div className="relative">
        <img src={image} alt="" className="w-full rounded-t-2xl" />
        
        <div className="absolute top-[200px] right-[20px] flex items-center">
          {count === 0 ? (
            <div className="bg-white h-8 w-8 cursor-pointer flex justify-center items-center rounded-full">
              <FaPlus onClick={() => setCount((prev) => prev + 1)} />
            </div>
          ) : (
            <div className="flex items-center bg-white p-1 rounded-3xl gap-3">
              <div className="bg-red-300 h-8 w-8 cursor-pointer flex justify-center items-center text-red-800 rounded-full">
                <FaMinus onClick={() => setCount((prev) => prev - 1)} />
              </div>
              <p>{count}</p>
              <div className="bg-green-300 h-8 w-8 cursor-pointer flex justify-center items-center text-green-800 rounded-full">
                <FaPlus onClick={() => setCount((prev) => prev + 1)} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold mb-2">{name}</p>
          <div className="flex gap-1">
            <Rating
              value={value}
              onChange={(e) => setValue(e.value ?? undefined)}
              cancel={false}
              className="text-6xl text-blue-600 py-2"
            />
          </div>
        </div>
        <p className="text-gray-700">{description}</p>
        <p className="mt-3 text-2xl text-rose-600">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;

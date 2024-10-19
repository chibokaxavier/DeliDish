import { menu_list } from "@/public/assets";
import React from "react";

interface CategoryProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const ExploreMenu = ({ category, setCategory }: CategoryProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold lg:text-5xl text-3xl">Explore our menu</h1>
      <p className="py-5 text-xl md:text-2xl font md:leading-10 leading-9">
        Choose from a diverse menu featuring a delectable array of dishes
        crafted with the finest ingredients and culinary expertise. Our mission
        is to satisfy your cravings and elevate your dining experience.
      </p>
      <div className="flex justify-between gap-5 overflow-x-scroll no-scrollbar py-5">
        {menu_list.map((item, i) => {
          return (
            <div
              onClick={() =>
                // Set category to "All" if the clicked menu is already active
                category === item.menu_name
                  ? setCategory("All")
                  : setCategory(item.menu_name)
              }
              key={i}
              className="flex flex-col items-center min-w-[150px] cursor-pointer"
            >
              <img
                src={item.menu_image}
                className={`${
                  category === item.menu_name
                    ? " border-rose-600 p-1 border-[4px]  transition-all ease-in-out  rounded-full"
                    : ""
                } w-[150px] h-[150px] object-cover`}
                alt={item.menu_name}
              />
              <p className="mt-2 text-center capitalize text-gray-600 text-base">
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>
      <hr className="my-2 text-gray-400" />
    </div>
  );
};

export default ExploreMenu;

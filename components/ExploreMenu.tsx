import { menu_list } from "@/public/assets";
import React from "react";

const ExploreMenu = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold lg:text-5xl text-3xl">Explore our menu</h1>
      <p className="py-5 text-xl md:text-2xl font md:leading-10 leading-9">
        Choose from a diverse menu featuring a delectable array of dishes
        crafted with the finest ingredients and culinary expertise. Our mission
        is to satisfy your cravings and elevate your dining experience.
      </p>
      <div className="flex gap-5 overflow-x-scroll no-scrollbar py-5">
        {menu_list.map((item, i) => {
          return (
            <div key={i} className="flex flex-col items-center min-w-[150px]">
              <img
                src={item.menu_image}
                className="w-[150px] h-[150px] object-cover"
                alt={item.menu_name}
              />
              <p className="mt-2 text-center">{item.menu_name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMenu;

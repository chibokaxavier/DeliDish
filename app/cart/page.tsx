"use client";
import { useStoreContext } from "@/context/StoreContext";
import React from "react";

const page = () => {
  const { food_list, cartItems } = useStoreContext();
  return (
    <div className="lg:mx-20 sm:mx-10 mx-5 mt-14 ">
      <div>
        <div className="grid grid-cols-6 items-center text-sm">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        <div className="">
          {food_list.map((item, index) => {
            const cartItem = cartItems[item._id];
            if (cartItem && cartItem.quantity > 0) {
              return (
                <div>
                  <div
                    key={index}
                    className="text-black grid grid-cols-6 items-center text-sm py-2"
                  >
                    <img src={item.image} alt="" className="w-[50px]" />
                    <p>{item.name}</p>
                    <p>{item.price}</p> <p>{cartItem.quantity}</p>
                    <p>{item.price * cartItem.quantity}</p> <p>X</p>
                  </div>
                  <hr />
                </div>
              );
            }
            return null; // If cartItem is undefined or quantity is 0, return null to render nothing.
          })}
        </div>
      </div>
    </div>
  );
};

export default page;

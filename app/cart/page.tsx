"use client";
import { useStoreContext } from "@/context/StoreContext";
import React from "react";
import { FaTrash } from "react-icons/fa";

const page = () => {
  const { food_list, cartItems, removeFromCart } = useStoreContext();
  return (
    <div className="lg:mx-20 sm:mx-10 mx-5 mt-14 mb-36 ">
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
                    className="text-black grid grid-cols-6 items-center text-sm py-2 font-bold"
                  >
                    <img src={item.image} alt="" className="w-[50px]" />
                    <p className="w-[55px] sm:w-[80px] md:w-[110px] lg:w-auto truncate">{item.name}</p>
                    <p>${item.price}</p> <p>{cartItem.quantity}</p>
                    <p>${item.price * cartItem.quantity}</p>{" "}
                    <p>
                      <FaTrash
                        className="text-red-600 cursor-pointer"
                        onClick={() => removeFromCart(item._id)}
                      />
                    </p>
                  </div>
                  <hr />
                </div>
              );
            }
            return null; // If cartItem is undefined or quantity is 0, return null to render nothing.
          })}
        </div>

        <div className="flex-col sm:flex-row flex  justify-between mt-20 ">
          <div className="flex flex-col gap-5 w-full mt-7 sm:mt-0 sm:w-[40%] order-2 sm:order-1">
            <p className="font-bold text-3xl">Cart totals</p>
            <div className=" flex justify-between border-gray-200 border-b-2 pb-2">
              <p>Subtotal</p>
              <p>{0}</p>
            </div>
            <div className="flex justify-between border-gray-200 border-b-2 pb-2">
              <p>Delivery Fee</p>
              <p>{2}</p>
            </div>{" "}
            <div className="flex justify-between ">
              <p className="font-bold">Total</p>
              <p>{0}</p>
            </div>
            <button className="bg-rose-600 px-10 py-4 w-[300px] uppercase text-white rounded-lg">
              Proceed to Checkout
            </button>
          </div>
          <div className="flex-col w-full sm:w-[40%] order-1 sm:order-2">
            <p>If you have a promo code. Enter it here</p>
            <div className="max-w-[570px] mt-[30px] mx-auto bg-black rounded-md flex items-center justify-between">
              <input
                type="search"
                className="py-3 pl-4 pr-4 bg-gray-100 w-full focus:outline-none cursor-text placeholder:text-gray-700"
                placeholder="promo code"
              />
              <button
                 className=" mt-0 text-white px-4  rounded-[0px] rounded-r-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

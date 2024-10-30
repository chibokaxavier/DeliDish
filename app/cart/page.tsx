"use client";
import { useStoreContext } from "@/context/StoreContext";
import Link from "next/link";
import React from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

const page = () => {
  const {
    food_list,
    cartItems,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
  } = useStoreContext();
  return (
    <div className="lg:mx-20 sm:mx-10 mx-5 mt-14 mb-36 ">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="lg:w-[65%]">
          {food_list.map((item, index) => {
            const cartItem = cartItems[item._id];
            if (cartItem && cartItem.quantity > 0) {
              return (
                <div className="w-full mb-5">
                  <div className=" flex justify-between w-full pb-5">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt=""
                        className="md:w-[200px] w-[150px] "
                      />
                      <div className="flex flex-col text-gray-500 leading-7">
                        <p className="text-black text-xl">{item.name}</p>
                        <p>{item.category}</p>
                        <p className="hidden sm:block">{item.description}</p>
                        <div className="flex items-center gap-5">
                          <span>${item.price}</span>{" "}
                          {/* <span>Quantity ({cartItem.quantity})</span> */}
                          {/* <FaTrash
                            className="text-red-500 text-xl cursor-pointer"
                            onClick={() => removeFromCart(item._id)}
                          /> */}
                          <div className="flex items-center bg-white p-1 rounded-3xl gap-3">
                            <div className="bg-red-300 h-6 w-6 cursor-pointer flex justify-center items-center text-red-800 rounded-full">
                              <FaMinus
                                onClick={() => removeFromCart(item._id)}
                              />
                            </div>
                            <p>{cartItem.quantity}</p>
                            <div className="bg-green-300 h-6 w-6 cursor-pointer flex justify-center items-center text-green-800 rounded-full">
                              <FaPlus onClick={() => addToCart(item._id)} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="">
                      <p className="text-xl font-semibold">
                        ${item.price * cartItem.quantity}
                      </p>{" "}
                    </p>
                  </div>
                  <hr className="text-gray-400" />
                </div>
              );
            }
            return null; // If cartItem is undefined or quantity is 0, return null to render nothing.
          })}
        </div>

        <div className="flex flex-col gap-5  mt-7 sm:mt-0 lg:w-[30%] order-2 sm:order-1">
          <p className="font-bold text-3xl">Cart totals</p>
          <div className=" flex justify-between border-gray-200 border-b-2 pb-2">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <div className="flex justify-between border-gray-200 border-b-2 pb-2">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>{" "}
          <div className="flex justify-between ">
            <p className="font-bold">Total</p>
            <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
          </div>
          <Link href={"/order"}>
            <button
              disabled={getTotalCartAmount() === 0}
              className={`${
                getTotalCartAmount() === 0
                  ? "cursor-not-allowed bg-gray-300"
                  : ""
              } bg-rose-600 px-10 py-4 w-[300px] uppercase text-white rounded-lg`}
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;

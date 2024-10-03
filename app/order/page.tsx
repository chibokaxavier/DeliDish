"use client";
import { useStoreContext } from "@/context/StoreContext";
import { Input } from "@nextui-org/react";
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
        <div className="lg:w-[40%]">
          <form action="">
            <div className="flex gap-2">
              <Input
                type="text"
                label="First Name"
                labelPlacement="outside"
                placeholder="John "
                errorMessage="Please enter a valid name"
                className="mb-3"
                isRequired
                required
                classNames={{
                  inputWrapper:
                    "bg-white border-2 focus-within:border-primary-100",
                }}
                name="name"
              />

              <Input
                type="text"
                label="Last Name"
                labelPlacement="outside"
                placeholder="Doe"
                errorMessage="Please enter a valid email"
                className="mb-3"
                isRequired
                required
                classNames={{
                  inputWrapper:
                    "bg-white border-2 focus-within:border-primary-100",
                }}
                name="name"
              />
            </div>
            <div>
              <Input
                type="email"
                label="Your Email Address"
                labelPlacement="outside"
                placeholder="Johndoe@gmail.com"
                errorMessage="Please enter a valid email"
                className="mb-10"
                isRequired
                required
                classNames={{
                  inputWrapper:
                    "bg-white border-2 focus-within:border-primary-100",
                }}
                name="name"
              />
            </div>
            <div>
              <Input
                type="text"
                label="Street Address"
                labelPlacement="outside"
                placeholder="404, Willimon street"
                errorMessage="Please enter a valid address"
                className="mb-3"
                isRequired
                required
                classNames={{
                  inputWrapper:
                    "bg-white border-2 focus-within:border-primary-100",
                }}
                name="name"
              />
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                label="City"
                labelPlacement="outside"
                placeholder="Maryland"
                errorMessage="Please enter a valid city"
                className="mb-3"
                isRequired
                required
                classNames={{
                  inputWrapper:
                    "bg-white border-2 focus-within:border-primary-100",
                }}
                name="name"
              />

              <Input
                type="text"
                label="State"
                labelPlacement="outside"
                placeholder="Lagos"
                errorMessage="Please enter a valid State"
                className="mb-3"
                isRequired
                required
                classNames={{
                  inputWrapper:
                    "bg-white border-2 focus-within:border-primary-100",
                }}
                name="name"
              />
            </div>
            <div>
              <Input
                type="text"
                label="Phone Number"
                labelPlacement="outside"
                placeholder="+234 900 7885 3844"
                errorMessage="Please enter a valid address"
                className="mb-3"
                isRequired
                required
                classNames={{
                  inputWrapper:
                    "bg-white border-2 focus-within:border-primary-100",
                }}
                name="name"
              />
            </div>
          </form>
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
            <button className="bg-rose-600 px-10 py-4 w-[300px] uppercase text-white rounded-lg">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;

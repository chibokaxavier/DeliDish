"use client";
import { useStoreContext } from "@/context/StoreContext";
import { Input } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const url = "http://localhost:4000";
  const { getTotalCartAmount, cartItems, food_list, token } = useStoreContext();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    phone: "",
  });
  const onChangeHandler = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const placeOrder = async (e: any) => {
    e.preventDefault();
    let orderItems: any[] = [];
    food_list.map((item) => {
      if (cartItems[item._id]?.quantity > 0) {
        const itemInfo = { ...item, quantity: cartItems[item._id].quantity };
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: formData.address,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    let res = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (res.data.session.url) {
      console.log("Redirecting to: ", );
      window.location.href = res.data.session.url;
    }
    // if (res.data.success) {
    //   const { session } = res.data;
    //    window.location.replace(session.success_url);
    // }
  };
  return (
    <div className="lg:mx-20 sm:mx-10 mx-5 mt-14 mb-36 ">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="lg:w-[40%]">
          <form action="" onSubmit={placeOrder}>
            <div className="flex gap-2">
              <Input
                type="text"
                label="First Name"
                labelPlacement="outside"
                placeholder="John "
                errorMessage="Please enter a valid name"
                className="mb-3"
                onChange={onChangeHandler}
                value={formData.firstName}
                isRequired
                required
                classNames={{
                  inputWrapper:
                    "bg-white border-2 focus-within:border-primary-100",
                }}
                name="firstName"
              />

              <Input
                type="text"
                label="Last Name"
                labelPlacement="outside"
                placeholder="Doe"
                errorMessage="Please enter a valid email"
                className="mb-3"
                isRequired
                onChange={onChangeHandler}
                value={formData.lastName}
                required
                classNames={{
                  inputWrapper:
                    "bg-white border-2 focus-within:border-primary-100",
                }}
                name="lastName"
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
                onChange={onChangeHandler}
                value={formData.email}
                required
                classNames={{
                  inputWrapper:
                    "bg-white border-2 focus-within:border-primary-100",
                }}
                name="email"
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
                onChange={onChangeHandler}
                value={formData.address}
                isRequired
                required
                classNames={{
                  inputWrapper:
                    "bg-white border-2 focus-within:border-primary-100",
                }}
                name="address"
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
                onChange={onChangeHandler}
                value={formData.city}
                required
                classNames={{
                  inputWrapper:
                    "bg-white border-2 focus-within:border-primary-100",
                }}
                name="city"
              />

              <Input
                type="text"
                label="State"
                labelPlacement="outside"
                placeholder="Lagos"
                errorMessage="Please enter a valid State"
                className="mb-3"
                onChange={onChangeHandler}
                value={formData.state}
                isRequired
                required
                classNames={{
                  inputWrapper:
                    "bg-white border-2 focus-within:border-primary-100",
                }}
                name="state"
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
                onChange={onChangeHandler}
                value={formData.phone}
                isRequired
                required
                classNames={{
                  inputWrapper:
                    "bg-white border-2 focus-within:border-primary-100",
                }}
                name="phone"
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
          <button
            className="bg-rose-600 px-10 py-4 w-[300px] uppercase text-white rounded-lg"
            onClick={(e) => placeOrder(e)}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;

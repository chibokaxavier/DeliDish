"use client";
import { useStoreContext } from "@/context/StoreContext";
import { Input, Skeleton } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";

const page = () => {
  const toast = useRef<Toast>(null);
  const url = "http://localhost:4000";
  const router = useRouter();
  const { getTotalCartAmount, cartItems, food_list, token, loading } =
    useStoreContext();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    phone: "",
  });

  const showError = () => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: 'Please log in to access this page',
      life: 5000,
    });
  };

  if (loading) {
    return (
      <div className="lg:mx-20 sm:mx-10 mx-5 my-20">
        <div className="flex lg:flex-row flex-col justify-between">
          <Skeleton className="h-[200px] lg:h-[300px] lg:w-[600px] rounded-3xl mb-5" />{" "}
          <div className="flex flex-col gap-7">
            <Skeleton className="h-[50px] lg:w-[600px] rounded-3xl" />{" "}
            <Skeleton className="h-[50px] lg:w-[600px] rounded-3xl" />{" "}
            <Skeleton className="h-[50px] lg:w-[600px] rounded-3xl" />{" "}
            <Skeleton className="h-[50px] lg:w-[600px] rounded-3xl" />{" "}
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    showError()
    router.push("/");
    return null;
  }

  const onChangeHandler = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

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
      address: formData,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    let res = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (res.data.session.url) {
      console.log("Redirecting to: ");
      window.location.href = res.data.session.url;
    }
    if (res.data.success) {
      localStorage.removeItem("cartItems");
    }
  };

  return (
    <div className="lg:mx-20 sm:mx-10 mx-5 mt-14 mb-36 ">
       <Toast ref={toast} />
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
            <button
              disabled={getTotalCartAmount() === 0}
              className={`
            
                disabled:cursor-not-allowed disabled:bg-gray-200
               bg-rose-600 px-10 py-4 w-[300px] uppercase text-white rounded-lg`}
              type="submit"
            >
              Proceed to Payment
            </button>
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
          <div className="flex justify-between border-b-2 pb-2 border-gray-200">
            <p className="font-bold">Total</p>
            <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

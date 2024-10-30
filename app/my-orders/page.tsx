"use client";
import FoodItem from "@/components/FoodItem";
import { useStoreContext } from "@/context/StoreContext";
import { assets } from "@/public/assets";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const { token } = useStoreContext();
  const [data, setData] = useState([]);
  const url = "http://localhost:4000";
  
  const fetchOrders = async () => {
    const res = await axios.get(url + "/api/order/get", {
      headers: { token },
    });
    setData(res.data.data);
    console.log(res.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="lg:px-20 sm:px-10 mx-5 sm:mx-0">
      <h2 className="lg:text-4xl text-xl md:text-2xl font-semibold pb-3">
        My orders
      </h2>

      {/* Horizontal scrollable wrapper */}
      <div className="overflow-x-auto ">
        <div className="min-w-[1300px] ">
          {data.map((order: any, index) => (
            <div
              key={index}
              className="grid grid-cols-8 items-center gap-4 border border-gray-200 p-4 mb-5"
            >
              <img src="/parcel_icon.png" alt="Parcel Icon" className="" />
              <p className="col-span-3 pr-5 text-sm">
                {order.items.map((item: any, idx: number) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}
                    {idx !== order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>
              <p className="text-sm">${order.amount}</p>
              <p className="text-sm">Items: {order.items.length}</p>
              <p className="font-semibold text-sm">{order.status}</p>
              <button className="bg-red-100 h-10 w-36 flex justify-center items-center text-sm font-medium">
                Track order
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;

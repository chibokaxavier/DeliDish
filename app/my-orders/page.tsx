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
    <div className="lg:px-20 sm:px-10 ">
      <h2>My orders</h2>
      <div>
        {data.map((order: any, index) => {
          return (
            <div key={index} className="grid grid-cols-8 border border-black items-center py-4 px-4 mb-2">
              <img src="/parcel_icon.png" alt="" />
              <p className="col-span-3 px-5">
                {order.items.map((item: any, index: number) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + " , ";
                  }
                })}
              </p>
              <p>${order.amount}</p>
              <p>Items: {order.items.length}</p>
              <p>{order.status}</p>
              <button>Track order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;

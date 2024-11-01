"use client";
import { useStoreContext } from "@/context/StoreContext";
import { Skeleton } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TbMoodEmptyFilled } from "react-icons/tb";

interface order {
  items: [];
  amount: number;
  status: string;
}

interface item {
  name: string;
  quantity: number;
}
const Page = () => {
  const { token, loading } = useStoreContext();
  const [data, setData] = useState([]);
  const url = "http://localhost:4000";
  const router = useRouter();

  useEffect(() => {
    // Redirect if no token
    if (!loading && !token) {
      router.push("/");
    }
  }, [loading, token, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${url}/api/order/get`, {
          headers: { token },
        });
        setData(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (token && !loading) {
      fetchOrders();
    }
  }, [token, loading]);

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
  return (
    <div className="lg:px-20 sm:px-10 mx-5 sm:mx-0">
      <h2 className="lg:text-4xl text-xl md:text-2xl font-semibold pb-3">
        My orders
      </h2>

      {/* Horizontal scrollable wrapper */}
      <div className="overflow-x-auto ">
        <div className="min-w-[1300px] h-screen ">
          {data.map((order: order, index) => (
            <div
              key={index}
              className="grid grid-cols-8 items-center gap-4 border border-gray-200 p-4 mb-5"
            >
              <img src="/parcel_icon.png" alt="Parcel Icon" className="" />
              <p className="col-span-3 pr-5 text-sm">
                {order.items.map((item: item, idx: number) => (
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
        {data.length === 0 && (
          <div>
            <div className="flex flex-col items-center my-20 text-gray-600">
              <TbMoodEmptyFilled className="text-8xl mb-4 text-gray-400" />
              <h1 className="text-2xl font-semibold">No Orders Found</h1>
              <p className="mt-2 text-center">
                It looks like you have not placed any orders yet.
                <br />
                Start exploring our collection and place your first order!
              </p>
              <button
                onClick={() => (window.location.href = "/")} // Change '/shop' to your shop or homepagP URL
                className="mt-6 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-lg uppercase"
              >
                Go to Shop
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

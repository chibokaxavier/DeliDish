"use client";
import axios from "axios";
import Link from "next/link";
import {  useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { MdCancel } from "react-icons/md";

const Page = ({ params }: { params: { id: string } }) => {
  const orderId = params.id;
  const url = "https://delisdish-api.onrender.com";
  const router = useRouter();

  useEffect(() => {
    const verifyOrder = async () => {
      const res = await axios.post(url + "/api/order/verify", {
        orderId,
        success: false,
      });
      if (res.data.success) {
        router.push("/");
      }
    };
    verifyOrder();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="p-10 bg-white rounded-lg shadow-lg text-center max-w-md w-full">
        <MdCancel className="text-red-500 text-6xl animate-bounce mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Failed!
        </h1>
        <p className="text-gray-600 mb-6">
          Your payment attempt failed ,kindly retry.
        </p>

        <Link href="/">
          <button className="w-full px-6 py-3 text-white bg-red-500 rounded-md shadow-lg hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50">
            Continue Shopping
          </button>
          {/* <button className="w-full px-6 py-3 text-white bg-red-500 rounded-md shadow-lg hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50">

          </button> */}
        </Link>
      </div>
    </div>
  );
};

export default Page;

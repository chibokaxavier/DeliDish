"use client";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const page = ({ params }: { params: { id: string } }) => {
  const orderId = params.id;
  const [success, setSuccess] = useState(false);
  const url = "http://localhost:4000";
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const verifyOrder = async () => {
      const res = await axios.post(url + "/api/order/verify", {
        orderId,
        success: true,
      });
      if (res.data.success) {
        router.push("/");
      }
    };
    if (pathname.includes("/checkout-success")) {
      setSuccess(true);
      verifyOrder();
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="p-10 bg-white rounded-lg shadow-lg text-center max-w-md w-full">
        <FaCheckCircle className="text-green-500 text-6xl animate-bounce mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your payment was successfully processed.
        </p>

        <Link href="/">
          <button className="w-full px-6 py-3 text-white bg-green-500 rounded-md shadow-lg hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default page;

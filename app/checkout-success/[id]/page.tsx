"use client";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
        success:true,
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

  return <div>success</div>;
};

export default page;

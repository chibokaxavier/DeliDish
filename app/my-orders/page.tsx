"use client";
import { useStoreContext } from "@/context/StoreContext";
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
  return <div>page</div>;
};

export default page;

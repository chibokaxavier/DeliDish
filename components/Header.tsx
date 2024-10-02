"use client";
import Link from "next/link";
import React from "react";
import Nav from "@/components/Nav";
import { Button } from "@nextui-org/react";

import MobileNav from "./MobileNav";
import { GiFoodTruck } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import { FaShoppingBasket } from "react-icons/fa";
import { useStoreContext } from "@/context/StoreContext";
import { RxAvatar } from "react-icons/rx";

const Header = () => {
  const { setVisible, visible } = useStoreContext();
  const { getTotalCartAmount, cartItems } = useStoreContext();
  return (
    <header className="py-8  lg:mx-20 sm:mx-10 mx-5">
      <div className=" flex justify-between items-center">
        <Link href={"/"}>
          <h1 className="md:text-4xl text-2xl font-semibold text-rose-600">
            <span className="flex gap-2 items-center justify-center">
              {" "}
              <GiFoodTruck className="md:text-5xl text-4xl mb-4" />{" "}
              <span className="">DeliDish</span>
              <span className="text-accent">.</span>
            </span>
          </h1>
        </Link>
        <div className="hidden xl:flex gap-8 justify-center items-center">
          <Nav />
        </div>
        <div className="flex items-center">
          <div className="flex md:gap-7 gap-3 relative justify-center items-center">
            <div
              className={`${
                getTotalCartAmount() === 0 ? "hidden" : "block"
              } h-4 w-4 text-white flex justify-center text-xs items-center rounded-full bg-rose-600 absolute md:-top-2 md:left-24 -top-3 left-16 `}
            >
              {Object.keys(cartItems).length}
            </div>

            <CiSearch className="md:text-4xl text-2xl cursor-pointer " />
            <Link href={"/cart"}>
              <FaShoppingBasket className="md:text-4xl text-2xl cursor-pointer " />
            </Link>
            <RxAvatar
              className=" cursor-pointer md:text-4xl text-2xl mr-3"
              onClick={() => setVisible(true)}
            />
          </div>
          <div className="xl:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import Nav from "@/components/Nav";
import { Button, Spinner } from "@nextui-org/react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import MobileNav from "./MobileNav";
import { GiFoodTruck } from "react-icons/gi";
import { CiLogout, CiSearch } from "react-icons/ci";
import { FaShoppingBasket } from "react-icons/fa";
import { useStoreContext } from "@/context/StoreContext";
import { RxAvatar } from "react-icons/rx";
import { FaBagShopping } from "react-icons/fa6";
import { Toast } from "primereact/toast";

const Header = () => {
  const toast = useRef<Toast>(null);
  const {
    setVisible,
    visible,
    token,
    userEmail,
    setToken,
    setUserEmail,
    loading,
  } = useStoreContext();
  const { getTotalCartAmount, cartItems } = useStoreContext();
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Successfully logged out",
      life: 3000,
    });
  };
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setToken(null);
    setUserEmail(null);
    setPopoverOpen(false);
    showSuccess();
  };
  const handleLogin = () => {
    // Ensure popover does not automatically open after login
    setPopoverOpen(false);
    setVisible(true);
  };
  return (
    <header className="py-8 lg:px-20 sm:px-10 px-5  sticky top-0 z-50 bg-white">
      <Toast ref={toast} />
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
                } h-4 w-4 text-white flex justify-center text-xs items-center rounded-full bg-rose-600 absolute md:-top-2 md:left-24 -top-3 left-16`}
              >
                {Object.keys(cartItems).length}
              </div>
            

            <CiSearch className="text-2xl sm:text-3xl  md:text-4xl  cursor-pointer " />
            <Link href={"/cart"}>
              <FaShoppingBasket className="text-2xl sm:text-3xl  md:text-4xl  cursor-pointer " />
            </Link>
            {loading ? (
              <Spinner size="md" className="" />
            ) : token ? (
              <Popover
                showArrow
                backdrop="opaque"
                offset={14}
                isOpen={isPopoverOpen}
                onOpenChange={setPopoverOpen}
              >
                <PopoverTrigger>
                  <button>
                    <p className=" size-7 md:size-10 flex justify-center items-center cursor-pointer rounded-full text-lg bg-rose-600 text-white">
                      {userEmail?.charAt(0)}
                    </p>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="py-4">
                  <div className="p-2 bg-white flex flex-col gap-5">
                    <div className="flex gap-3 text-lg justify-center items-center cursor-pointer">
                      <FaBagShopping className="" /> <p>Orders</p>
                    </div>
                    <hr className="text-black border border-black" />
                    <div
                      className="flex gap-3 text-lg justify-center items-center cursor-pointer"
                      onClick={logOut}
                    >
                      <CiLogout /> <p>Log Out</p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <RxAvatar
                className=" cursor-pointer md:text-4xl text-2xl mr-3"
                onClick={handleLogin}
              />
            )}
          </div>
          <div className="xl:hidden ml-3">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

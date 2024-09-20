import Link from "next/link";
import React from "react";
import Nav from "@/components/Nav";
import { Button } from "@nextui-org/react";

import MobileNav from "./MobileNav";
import { GiFoodTruck } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import { FaShoppingBasket } from "react-icons/fa";

const Header = () => {
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
        <div className="hidden xl:flex gap-7 relative justify-center items-center">
          <div className="h-3 w-3 rounded-full bg-rose-600 absolute -top-2 left-24 " />
          <CiSearch className="text-4xl cursor-pointer " />
          <FaShoppingBasket className="text-4xl cursor-pointer " />
          <Link href={"/contact"}>
            <Button className="bg-white rounded-3xl p-4 border border-black hover:bg-gray-100 transitio dur ease-in-out">
              Sign in{" "}
            </Button>
          </Link>
        </div>
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;

import Link from "next/link";
import React from "react";
import Nav from "@/components/Nav";
import { Button } from "./ui/button";
import MobileNav from "./MobileNav";
import { GiFoodTruck } from "react-icons/gi";

const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-white" >
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <h1 className="text-4xl font-semibold">
            DeliDish<span className="text-accent">.</span>
          </h1>
        </Link>
        <div className="hidden xl:flex gap-8 justify-center items-center">
          <Nav />
          <Link href={"/contact"}>
            <Button>Hire me </Button>
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

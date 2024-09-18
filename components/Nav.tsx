"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const links = [
    {
      name: "home",
      path: "/",
    },
    {
      name: "menu",
      path: "",
    },
    {
      name: "mobile-app",
      path: "",
    },

    {
      name: "contact us",
      path: "",
    },
  ];
  const pathName = usePathname();
  return (
    <nav className="flex gap-8">
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`${
              link.path === pathName &&
              "text-rose-600 border-b-2 border-rose-600"
            } capitalize font-medium hover:text-rose-600 transition-all`}
          >
            {" "}
            {link.name}{" "}
          </Link>
        );
      })}{" "}
    </nav>
  );
};

export default Nav;

"use client";
import React, { useEffect } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { GiFoodTruck, GiHospitalCross } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="flex flex-col  text-gray-400 ">
      <div className="flex  xl:flex-row flex-col justify-evenly pt-20 pb-5 px-5 bg-black">
        <div className="pb-20">
          <p className="text-4xl pb-3 gap-2 text-rose-600  flex items-center justify-self-center8 font-bold">
            <span>
              {" "}
              <GiFoodTruck />
            </span>
            DeliDish
          </p>
          <div className=" gap-8  flex">
            <FaFacebook className="social" />
            <FaInstagram className="social" />
            <FaPinterest className="social" />
            <FaYoutube className="social" />
            <FaTwitter className="social" />
          </div>
        </div>
        <div className="grid xl:grid-cols-2 grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-20 pb-10">
          <div className="text-gray-400">
            <p className="mb-6 font-bold text-white text-2xl capitalize">
              COMPANY
            </p>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Home
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              About us
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Delivery
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Privacy Policy
            </div>
          </div>
          <div className="text-gray-400">
            <p className="mb-6 font-bold text-white text-2xl">GET IN TOUCH </p>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              +1 789 5422
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              delidish@gmail.com
            </div>
          </div>
       
        </div>
      </div>
    </footer>
  );
};

export default Footer;

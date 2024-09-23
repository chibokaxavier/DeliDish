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
          <p className="text-4xl pb-3 gap-2  flex items-center justify-self-center8 font-bold">
            <span>
              {" "}
              < GiFoodTruck/>
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
        <div className="grid xl:grid-cols-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 pb-10">
          <div className="text-gray-400">
            <p className="mb-10 font-bold text-white">Quick Links</p>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Home
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              About us
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Services
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Blog
            </div>
          </div>
          <div className="text-gray-400">
            <p className="mb-10 font-bold text-white">I want to </p>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Book a Chef
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Order a Meal
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Find a location
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Get an opinion
            </div>
          </div>
          <div className="text-gray-400">
            <p className="mb-10 font-bold text-white">Support</p>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Donate
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Contact us
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Product Returns
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              FAQs
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

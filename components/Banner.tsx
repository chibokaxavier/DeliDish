import React from "react";

const Banner = () => {
  return (
    <div className="h-[400px] my-[30px] relative  flex flex-col lg:flex-row xl:gap-[90px] lg:gap-[60px] items-center ">
      <div className="lg:w-[50%]">
        <h2 className="font-bold lg:text-5xl text-3xl ">Order your food here</h2>
        <p className="py-5 text-xl md:text-[21px] font md:leading-10 leading-9">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining experience
          , one delicious meal at a time.{" "}
        </p>
        <button className="p-4 transition-all hover:bg-white ease-in-out hover:text-black border border-red-600  bg-rose-600  rounded-[35px] text-white  w-40">View Menu</button>
      </div>
      <div className="">
        <img
          src="/Cooking-bro.png"
          className="lg:h-[500px]  lg:w-[500px] xl:h-[600px] xl:w-[600px] "
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;

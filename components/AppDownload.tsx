import React from "react";

const AppDownload = () => {
  return (
    <div className="flex justify-center  items-center gap-10  my-24 flex-col">
      <div className="capitalize sm:text-3xl text-2xl  md:text-4xl font-bold md:w-[700px]  text-center   ">
        For better experience download the DeliDish app
      </div>
      <div className="flex sm:gap-10 gap-3">
        <img
          src="/app_store.png"
          alt=""
          className="cursor-pointer  size-[48%]  hover:scale-105 transition-all ease-in-out duration-100"
        />
        <img
          src="/play_store.png"
          alt=""
          className="cursor-pointer size-[50%]   hover:scale-105 transition-all ease-in-out duration-100"
        />
      </div>
    </div>
  );
};

export default AppDownload;

import React from "react";

const Banner = () => {
  return (
    <section>
      <div className="xl:h-[550px] h-auto mt-[10px] flex flex-col xl:flex-row xl:gap-[90px]">
        {/* Text Section */}
        <div className="xl:w-[50%]">
          <h2 className="font-bold lg:text-5xl text-3xl">
            Order your food here
          </h2>
          <p className="py-5 text-xl md:text-2xl font md:leading-10 leading-9">
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise. Our
            mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </p>
          <button className="p-4 transition-all hover:bg-white ease-in-out hover:text-black border border-red-600 bg-rose-600 rounded-[35px] text-white w-40">
            View Menu
          </button>
        </div>

        {/* Image Section */}
        <div className="flex justify-center items-center xl:w-[50%]  xl:mb-36">
          <img
            src="/Cooking-bro.png"
            className="  md:w-[500px] md:h-[500px] lg:h-[600px] lg:w-[600px] object-contain"
            alt="Food Illustration"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;

"use client";
import AppDownload from "@/components/AppDownload";
import Banner from "@/components/Banner";
import ExploreMenu from "@/components/ExploreMenu";
import FoodDisplay from "@/components/FoodDisplay";
import SignupModal from "@/components/SignupModal";
import { useState } from "react";

export default function Home() {
  const [category, setCategory] = useState<string>("All");
 

  return (
    <div className="lg:mx-20 sm:mx-10 mx-5 ">
      <section className=" ">
        <Banner />
      </section>
      <section className="">
        <ExploreMenu category={category} setCategory={setCategory} />
      </section>
      <section>
        <FoodDisplay category={category} setCategory={setCategory} />
      </section>
      <section>
        <AppDownload />
      </section>
      <SignupModal />
    </div>
  );
}

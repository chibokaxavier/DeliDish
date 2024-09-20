"use client";
import Banner from "@/components/Banner";
import ExploreMenu from "@/components/ExploreMenu";
import { menu_list } from "@/public/assets";
import Image from "next/image";
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
      {category}
    </div>
  );
}

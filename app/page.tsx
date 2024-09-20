import Banner from "@/components/Banner";
import ExploreMenu from "@/components/ExploreMenu";
import { menu_list } from "@/public/assets";
import Image from "next/image";

export default function Home() {
  return (
    <div className="lg:mx-20 mx-5 ">
      <section className="">
        <Banner />
      </section>
      <section className="">
        <ExploreMenu />
      </section>
    </div>
  );
}

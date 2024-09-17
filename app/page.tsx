import Header from "@/components/header";
import LatestProducts from "@/components/latestProducts";
import FeaturedProducts from "@/components/mainFeatures";

import MainSection from "@/components/mainSection";

import prisma from "@/lib/db";

import Image from "next/image";
import React from "react";

export default async function Home() {
  const products = await prisma.product.findMany();

  return (
    <>
      <Header />
      <section className="bg-gray-100 py-4 h-[88vh] relative">
        <Image
          src={"/assets/imgs/lamp.png"}
          width={1000}
          height={1000}
          alt="lamp"
          className=" hidden md:block max-w-[400px] absolute top-0 -left-[40px] z-10 opacity-30"
        />
        <div className="container mx-auto mt-10 relative z-20">
          <MainSection />
        </div>
      </section>
      <section className="container mx-auto relative z-20">
        <FeaturedProducts />
        <LatestProducts />
      </section>
    </>
  );
}

import LatestProducts from "@/components/latestProducts";
import FeaturedProducts from "@/components/mainFeatures";

import MainSection from "@/components/mainSection";

import React from "react";

export default async function Home() {
  // const products = await prisma.product.findMany();

  return (
    <>
      <section className="bg-gray-100 py-4 h-[88vh]">
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

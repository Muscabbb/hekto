import LatestProducts from "@/components/mainFeatures";
import FeaturedProducts from "@/components/latestProducts";
import Footer from "@/components/Footer";
import MainSection from "@/components/mainSection";

import React from "react";

export default async function Home() {
  // const products = await prisma.product.findMany();

  return (
    <>
      <section className="h-[88vh]">
        <div className="container mx-auto relative z-20">
          <MainSection />
        </div>
      </section>
      <section className="container mx-auto relative z-20">
        <FeaturedProducts />
        <LatestProducts />
      </section>
      <Footer />
    </>
  );
}

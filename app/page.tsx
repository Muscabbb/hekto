import Header from "@/components/header";
import MainSection from "@/components/mainSection";

import prisma from "@/lib/db";

import Image from "next/image";

export default async function Home() {
  const products = await prisma.product.findMany();
  return (
    <>
      <Header />
      <section className="bg-gray-100 py-4 h-[88vh]   ">
        <div className="container mx-auto mt-10">
          <MainSection />
        </div>
      </section>
    </>
  );
}

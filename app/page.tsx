import prisma from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  const products = await prisma.product.findMany();
  return (
    <>
      <h1>home page</h1>
      <Image
        src={products[0].productImage as string}
        width={1000}
        height={1000}
        alt={products[0].productName as string}
        className="max-w-[300px] max-h-[300px]"
      />
    </>
  );
}

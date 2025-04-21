"use client";

import Link from "next/link";
import { PunchOfImages } from "@/Constants/indext";
import ProductCard from "./productCard";
import { useState } from "react";

const latestProducts = [
  "New Arrival",
  "best seller",
  "featured",
  "special offer",
];

export default function LatestProducts() {
  const [latestCategories] = useState(latestProducts);
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-4xl font-bold text-center mb-6 primary-text">
        Latest Products
      </h2>
      <ul className="flex items-center justify-center gap-4 mx-auto mb-5">
        {latestCategories.map((el, i) => (
          <Link
            href={""}
            key={i}
            className="primary-text text-lg hover:text-pink-500 border-pink-500 transition-colors capitalize hover:border-b"
          >
            {el}
          </Link>
        ))}
      </ul>
      <section className="flex items-center justify-center gap-8 flex-wrap">
        {PunchOfImages.map((item, i) => (
          <ProductCard
            key={i}
            imgSrc={item.src}
            imgAlt={item.alt}
            productName={item.title}
            price={`${Number.parseFloat(item.price) * 2}.00`}
            discountPrice={item.price}
          />
        ))}
      </section>
    </div>
  );
}

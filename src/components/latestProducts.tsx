"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductsType } from "@/types/productsType";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function LatestProducts() {
  const [categories, setCategories] = useState<string[]>([]);
  const [allProducts, setAllProducts] = useState<ProductsType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductsType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/getAll");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const all: ProductsType[] = data.products;

        setAllProducts(all);
        setFilteredProducts(all);

        const uniqueCategories = [
          ...new Set(
            all.filter((p) => p.masterCategory).map((p) => p.masterCategory)
          ),
        ];

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryClick = (category: string) => {
    if (category === "All") {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        (product) => product.masterCategory === category
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl text-center font-bold mb-6">
        Product Categories
      </h1>

      {/* Category Buttons */}
      <div className="container flex flex-wrap gap-2 mb-8 mx-auto">
        <Button onClick={() => handleCategoryClick("All")}>All</Button>
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryClick(category)}
            variant="outline"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg line-clamp-1">
                  {product.productDisplayName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src={product.image}
                  alt={product.productDisplayName}
                  width={300}
                  height={300}
                  className="w-full h-[300px] object-cover rounded-md"
                  unoptimized
                />
                <p className="mt-4 text-lg font-semibold">
                  ${product.price.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

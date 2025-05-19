"use client";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/procuctCard";
import { ProductProvider } from "@/context/ProductContext";

export default function ProductList() {
  return (
    <ProductProvider>
      <div className="space-y-6">
        <SearchBar />
        <ProductCard />
      </div>
    </ProductProvider>
  );
}

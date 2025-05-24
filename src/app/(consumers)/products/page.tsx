"use client";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/procuctCard";

export default function ProductList() {
  return (
    <div className="space-y-6">
      <SearchBar />
      <ProductCard />
    </div>
  );
}

"use client";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/procuctCard";
import ProductCategories from "../components/ProductCategories";

export default function ProductList() {
  return (
    <div className="space-y-6">
      <ProductCategories />
      <SearchBar />
      <ProductCard />
    </div>
  );
}

"use client";

import { Card, CardContent } from "@/components/ui/card";
import LoadingSpinner from "./LoadingSpinner";

export default function ProductCardSkeleton() {
  return (
    <Card className="group cursor-pointer transition-all duration-300 border-0 shadow-md overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
      <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
        <LoadingSpinner 
          size="lg" 
          text="Loading product..." 
          className="text-center"
        />
      </CardContent>
    </Card>
  );
}

// Component to render multiple skeleton cards
export function ProductCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
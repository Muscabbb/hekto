"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useProductContext } from "@/context/ProductContext";
import { ProductsType } from "@/types/productsType";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export default function RecommendationsPage() {
  const { user } = useUser();
  const { state, dispatch } = useProductContext();
  const [recommendations, setRecommendations] = useState<ProductsType[]>([]);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    if (!user) {
      toast.error("You must be signed in to get recommendations.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:8000/rec`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: `${user?.publicMetadata.dbId}` }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data.products)) {
        setRecommendations(data.products);
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "hekto_recommendations",
            JSON.stringify(data.products)
          );
        }
        dispatch({ type: "SET_PRODUCTS", payload: data.products });
      } else {
        console.error("Unexpected API response:", data);
      }
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      toast.error("Failed to fetch recommendations.");

      const saved = localStorage.getItem("hekto_recommendations");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setRecommendations(parsed);
        } catch (e) {
          console.error("Error parsing saved recommendations:", e);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: ProductsType, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!state.cart.some((item) => item.id === product.id)) {
      dispatch({ type: "ADD_TO_CART", payload: product });
      toast.success("Added to cart!", {
        description: `${product.productDisplayName} has been added to your cart.`,
      });
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Recommendations</h1>
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
          <p>Please sign in to see your personalized recommendations.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Recommendations</h1>

      {recommendations.length === 0 ? (
        <div className="text-center space-y-4 bg-gray-50 border border-gray-200 px-6 py-8 rounded">
          <p>
            Want to see personalized products based on what {`you've`} viewed,
            added to cart, or purchased — and what users like you also liked?
          </p>
          <Button onClick={getRecommendations} disabled={loading}>
            {loading ? "Fetching..." : "Get My Recommendations"}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendations.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <Card className="h-full cursor-pointer hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-4">
                  <div className="relative pb-[100%] bg-gray-100 mb-4 overflow-hidden rounded-md">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.productDisplayName}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        unoptimized={true}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                    <Button
                      className={`absolute bottom-2 right-2 p-2 rounded-full shadow-md z-10 transition-colors ${
                        state.cart.some((item) => item.id === product.id)
                          ? "bg-green-500 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={(e) => handleAddToCart(product, e)}
                      disabled={state.cart.some(
                        (item) => item.id === product.id
                      )}
                      title={
                        state.cart.some((item) => item.id === product.id)
                          ? "Already in cart"
                          : "Add to cart"
                      }
                    >
                      {state.cart.some((item) => item.id === product.id) ? (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <ShoppingCart className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="px-4 pb-4 pt-0 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900 line-clamp-1">
                      {product.productDisplayName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {product.articleType}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    ${product.price}
                  </p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

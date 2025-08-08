"use client";

import { Button } from "@/components/ui/button";
import { useProductContext } from "@/context/ProductContext";
import { use, useEffect, useState } from "react";
import { ProductsType } from "@/types/productsType";
import { toast } from "sonner";
import ImageWithSpinner from "../../components/ImageWithSpinner";
import LoadingSpinner from "../../components/LoadingSpinner";

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetails({ params }: ProductDetailsPageProps) {
  const { id } = use(params);
  const [product, setProduct] = useState<ProductsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const { state, dispatch } = useProductContext();

  useEffect(() => {
    if (!id) {
      setError("No Product ID found");
      setLoading(false);
      return;
    }

    // Fetch product details from API
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/getbyId/${id}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        setError("Err fetching product details.!!");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (product) {
      setAddingToCart(true);
      // Simulate loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      dispatch({
        type: "ADD_TO_CART",
        payload: product,
      });
      // Show success toast
      toast.success("Product added to cart successfully!", {
        description: `${product.productDisplayName} has been added to your cart.`,
      });
      setAddingToCart(false);
    }
  };

  const isInCart = product
    ? state.cart.some((item) => item.id === product.id)
    : false;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner 
          size="xl" 
          text="Loading product details..." 
          className="text-center"
        />
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">{error}</div>;
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="lg:w-1/2">
          <div className="rounded-lg overflow-hidden w-[400px] h-[400px]">
            <ImageWithSpinner
              src={product.image}
              alt={product.productDisplayName}
              width={400}
              height={400}
              className="object-cover w-[400px] h-[400px]"
              containerClassName="w-[400px] h-[400px]"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {product.productDisplayName}
            </h1>

            {/* Price */}
            <div className="flex items-baseline mb-4">
              <span className="text-2xl font-bold text-gray-900 mr-2">
                ${product.price}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-4">{product.productDisplayName}</p>

            {/* Additional Fields */}
            <div className="text-sm text-gray-700 space-y-1 mb-6">
              <p>
                <strong>Category:</strong> {product.masterCategory} &rarr;{" "}
                {product.subCategory} &rarr; {product.articleType}
              </p>
              <p>
                <strong>Color:</strong> {product.baseColour}
              </p>
              <p>
                <strong>Gender:</strong> {product.gender}
              </p>
              <p>
                <strong>Season:</strong> {product.season}
              </p>
              <p>
                <strong>Year:</strong> {product.year}
              </p>
              <p>
                <strong>Usage:</strong> {product.usage}
              </p>
            </div>

            {/* Add to Cart Button */}
            <div className="flex items-center gap-4">
              <Button
                className="flex-1"
                size="lg"
                onClick={handleAddToCart}
                disabled={isInCart || addingToCart}
              >
                {addingToCart ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Adding...
                  </div>
                ) : isInCart ? (
                  "Already in Cart"
                ) : (
                  "Add to Cart"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

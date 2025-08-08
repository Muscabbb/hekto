import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProductContext } from "@/context/ProductContext";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, Heart, Eye } from "lucide-react";
import productInterAction from "../actions/productInterAction";
import { ProductsType } from "@/types/productsType";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export default function ProductCard() {
  const { user } = useUser();
  const {
    state: { products, cart },
    dispatch,
  } = useProductContext();
  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-xl text-gray-500">No products available</p>
      </div>
    );
  }

  const handleCartSubmit = async (
    product: ProductsType,
    action: "view" | "add_to_cart" | "purchase"
  ) => {
    await productInterAction(product.id.toString(), user?.id as string, action);
  };

  const handleProductPage = async (
    product: ProductsType,
    action: "view" | "add_to_cart" | "purchase"
  ) => {
    await productInterAction(product.id.toString(), user?.id as string, action);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => {
        return (
          <Link href={`products/${product.id}`} key={product.id}>
            <Card
              className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-md overflow-hidden bg-white"
              onClick={() => {
                dispatch({ type: "SELECT_PRODUCT", payload: product });
                // Log view interaction
                handleProductPage(product, "view");
              }}
            >
              <CardHeader className="p-0 relative">
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                  <Badge variant="secondary" className="bg-white/90 text-gray-700 text-xs font-medium">
                    {product.masterCategory}
                  </Badge>
                  {product.season && (
                    <Badge variant="outline" className="bg-white/90 border-gray-300 text-gray-600 text-xs">
                      {product.season}
                    </Badge>
                  )}
                </div>
                <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                  </button>
                  <button className="p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="p-0 relative overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center relative group-hover:scale-105 transition-transform duration-300">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.productDisplayName}
                      width={300}
                      height={300}
                      unoptimized={true}
                      className="object-contain w-full h-full p-4"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                      No Image Available
                    </div>
                  )}
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <button
                    className={`p-3 rounded-full shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-110 ${
                      cart.some((item) => item.id === product.id)
                        ? "bg-green-500 text-white shadow-green-200"
                        : "bg-white text-gray-700 hover:bg-gray-50 shadow-gray-200"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      if (!cart.some((item) => item.id === product.id)) {
                        dispatch({ type: "ADD_TO_CART", payload: product });
                        handleCartSubmit(product, "add_to_cart");

                        toast.success("Added to cart!", {
                          description: `${product.productDisplayName} has been added to your cart.`,
                        });
                      }
                    }}
                    disabled={cart.some((item) => item.id === product.id)}
                    title={
                      cart.some((item) => item.id === product.id)
                        ? "Already in cart"
                        : "Add to cart"
                    }
                  >
                    {cart.some((item) => item.id === product.id) ? (
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
                  </button>
                </div>
              </CardContent>
              <CardFooter className="p-4 bg-white">
                <div className="w-full space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 flex-1 mr-2">
                      {product.productDisplayName}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-xs text-gray-600">4.5</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    {product.baseColour && (
                      <Badge variant="outline" className="text-xs px-2 py-1 bg-gray-50">
                        {product.baseColour}
                      </Badge>
                    )}
                    {product.gender && (
                      <Badge variant="outline" className="text-xs px-2 py-1 bg-blue-50 text-blue-700">
                        {product.gender}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price}
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        ${(product.price * 1.2).toFixed(2)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-green-600 font-medium">
                        Free Shipping
                      </span>
                      <div className="text-xs text-gray-500">
                        {product.subCategory}
                      </div>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

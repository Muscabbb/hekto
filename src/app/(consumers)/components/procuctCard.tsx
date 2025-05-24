import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useProductContext } from "@/context/ProductContext";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import productInterAction from "../actions/productInterAction";
import { ProductsType } from "@/types/productsType";
import { useUser } from "@clerk/nextjs";

export default function ProductCard() {
  const { user } = useUser();
  const {
    state: { products },
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
              className="p-4 cursor-pointer"
              onClick={() => {
                dispatch({ type: "SELECT_PRODUCT", payload: product });
                // Log view interaction
                handleProductPage(product, "view");
              }}
            >
              <CardContent className="card-img h-4/5 group flex justify-center items-center bg-slate-200 relative hover:bg-white">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.productDisplayName}
                    width={200}
                    height={200}
                    unoptimized={true}
                    className="md:mx-auto w-[150px] h-[150px] md:max-h-[200px]"
                  />
                ) : (
                  <div className="w-full h-60 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm">
                    No Image Available
                  </div>
                )}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="p-2 rounded-full bg-white shadow-md cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigating to product
                      e.stopPropagation(); // Prevent event bubbling to the parent card
                      dispatch({ type: "ADD_TO_CART", payload: product });
                      handleCartSubmit(product, "add_to_cart");
                    }}
                  >
                    <ShoppingCart className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center pt-3 font-semibold">
                <h3 className="capitalize primary-text">
                  {product.productDisplayName.split(" ").slice(0, 2).join(" ")}
                </h3>
                <h4 className="primary-text">{product.price}</h4>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

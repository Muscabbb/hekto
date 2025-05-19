import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useProductContext } from "@/context/ProductContext";
import Image from "next/image";

export default function ProductCard() {
  const {
    state: { products },
    setSelectedProduct,
  } = useProductContext();
  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-xl text-gray-500">No products available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => {
        return (
          <Card
            key={product.id}
            className="p-4 cursor-pointer"
            onClick={() => setSelectedProduct(product)}
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
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-3 font-semibold">
              <h3 className="capitalize primary-text">
                {product.productDisplayName.split(" ").slice(0, 2).join(" ")}
              </h3>
              {/* <h4 className="space-x-2">
                <span className="primary-text">${product.}</span>
                {product.discounted_price && (
                  <span className="text-red-500">
                    ({product.discounted_price}% off)
                  </span>
                )}
                
              </h4> */}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

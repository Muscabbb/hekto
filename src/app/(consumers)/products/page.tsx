import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getProducts } from "@/lib/elastic/getProducts";
import Image from "next/image";
import SearchBar from "../components/SearchBar";

export default async function ProductList() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <SearchBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => {
          let imageSrc = "";
          try {
            // Check if the imageUrl exists and if it's a valid string
            if (product?.imageUrl && typeof product?.imageUrl === "string") {
              // If it's a valid JSON string, parse it
              const parsedImageUrl = JSON.parse(product.imageUrl);
              imageSrc = Array.isArray(parsedImageUrl)
                ? parsedImageUrl[0]
                : parsedImageUrl;
            } else {
              // If imageUrl is already a valid URL string, use it directly
              imageSrc = product?.imageUrl || "";
            }
          } catch (error) {
            console.error("Error parsing image URL:", error);
            imageSrc = ""; // Fallback in case of parsing error
          }

          return (
            <Card key={product.id} className="p-4">
              <CardContent className="card-img h-4/5 group flex justify-center items-center bg-slate-200 relative hover:bg-white">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={product.name}
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
                <h3 className="capitalize primary-text">{product.name}</h3>
                <h4 className="space-x-2">
                  <span className="primary-text">${product.price}</span>
                </h4>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

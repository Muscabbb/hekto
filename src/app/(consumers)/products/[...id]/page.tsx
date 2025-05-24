import Image from "next/image"; // Import Image component
import { Button } from "@/components/ui/button"; // Import Button component

interface ProductDetailsPageProps {
  params: {
    id: string[];
  };
}

export default async function ProductDetails({
  params,
}: ProductDetailsPageProps) {
  const productId = params.id?.[0] ?? null;

  if (!productId) {
    return <div>No Product ID found</div>;
  }

  // Fetch product details from API
  let product = null;
  try {
    const response = await fetch(`http://localhost:8000/getbyId/${productId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    product = data.product;
  } catch (error) {
    console.error("Failed to fetch product details:", error);
    return <div>Error fetching product details.</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="lg:w-1/2">
          <div className="rounded-lg overflow-hidden w-[400px] h-[400px]">
            <Image
              src={product.image}
              alt={product.productDisplayName}
              width={400}
              height={400}
              unoptimized={true}
              className="object-cover w-[400px] h-[400px]"
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
              <Button className="flex-1" size="lg">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

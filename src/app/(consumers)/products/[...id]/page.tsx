import { getCurrentUser } from "@/services/clerk";
import productInterAction from "../../actions/productInterAction";

interface ProductDetailsPageProps {
  params: {
    id: string[];
  };
}

export default async function ProductDetails({
  params,
}: ProductDetailsPageProps) {
  const productId = params.id ? params.id[0] : null;
  const currentUser = await getCurrentUser();
  await productInterAction(
    productId as string,
    currentUser?.userId as string,
    "view"
  );
  return (
    <div>
      <h1>Product Details Page</h1>
      {productId ? <p>Product ID: {productId}</p> : <p>No Product ID found</p>}
    </div>
  );
}

import { ProductsType } from "@/types/productsType";
import client from "./elasticClient";

export async function getProducts(
  from: number = 0,
  size: number = 20
): Promise<ProductsType[]> {
  await client.search({
    index: "hekto",
    from,
    size,
  });
  return [];
}

import client from "./elasticClient";

export interface Product {
  id: string;
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  [key: string]: any;
}

export async function getProducts(
  from: number = 0,
  size: number = 20
): Promise<Product[]> {
  const result = await client.search({
    index: "hekto",
    from,
    size,
    query: {
      match_all: {},
    },
  });
  return [];
}

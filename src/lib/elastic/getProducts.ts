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

  return result.hits.hits.map((hit) => {
    const source = hit._source;
    const imageUrl = Array.isArray(source.image)
      ? source.image[0]
      : source.image;
    return {
      id: hit._id,
      ...source,
      imageUrl,
    };
  }) as Product[];
}

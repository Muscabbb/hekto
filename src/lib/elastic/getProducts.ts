/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductsType } from "@/types/productsType";
import client from "./elasticClient";

const INDEX_NAME = process.env.INDEX_NAME || "hekto";

export async function getProducts(
  from: number = 0,
  size: number = 20,
  searchQuery?: string
): Promise<ProductsType[]> {
  try {
    let query: any = {
      match_all: {},
    };

    if (searchQuery) {
      query = {
        multi_match: {
          query: searchQuery,
          fields: [
            "productDisplayName",
            "masterCategory",
            "subCategory",
            "articleType",
          ],
        },
      };
    }

    const response = await client.search({
      index: INDEX_NAME,
      query,
      from,
      size,
      sort: [{ id: { order: "desc" } }],
    });

    const products = response.hits.hits.map((hit: any) => ({
      id: hit._source.id,
      price: hit._source.price,
      articleType: hit._source.articleType,
      baseColour: hit._source.baseColour,
      gender: hit._source.gender,
      image: hit._source.image,
      masterCategory: hit._source.masterCategory,
      productDisplayName: hit._source.productDisplayName,
      season: hit._source.season,
      subCategory: hit._source.subCategory,
      usage: hit._source.usage,
      year: hit._source.year,
    }));

    return products;
  } catch (error) {
    console.error("Error fetching products from Elasticsearch:", error);
    return [];
  }
}

export async function searchProducts(
  query: string,
  filters?: {
    category?: string;
    gender?: string;
    priceRange?: { min: number; max: number };
  },
  from: number = 0,
  size: number = 20
): Promise<ProductsType[]> {
  try {
    const searchQuery: any = {
      bool: {
        must: [],
        filter: [],
      },
    };

    if (query) {
      searchQuery.bool.must.push({
        multi_match: {
          query,
          fields: [
            "productDisplayName^2",
            "masterCategory",
            "subCategory",
            "articleType",
          ],
          fuzziness: "AUTO",
        },
      });
    } else {
      searchQuery.bool.must.push({ match_all: {} });
    }

    if (filters?.category) {
      searchQuery.bool.filter.push({
        term: { "masterCategory.keyword": filters.category },
      });
    }

    if (filters?.gender) {
      searchQuery.bool.filter.push({
        term: { "gender.keyword": filters.gender },
      });
    }

    if (filters?.priceRange) {
      searchQuery.bool.filter.push({
        range: {
          price: {
            gte: filters.priceRange.min,
            lte: filters.priceRange.max,
          },
        },
      });
    }

    const response = await client.search({
      index: INDEX_NAME,
      query: searchQuery,
      from,
      size,
      sort: [{ _score: { order: "desc" } }, { id: { order: "desc" } }],
    });

    const products = response.hits.hits.map((hit: any) => ({
      id: hit._source.id,
      price: hit._source.price,
      articleType: hit._source.articleType,
      baseColour: hit._source.baseColour,
      gender: hit._source.gender,
      image: hit._source.image,
      masterCategory: hit._source.masterCategory,
      productDisplayName: hit._source.productDisplayName,
      season: hit._source.season,
      subCategory: hit._source.subCategory,
      usage: hit._source.usage,
      year: hit._source.year,
    }));

    return products;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}

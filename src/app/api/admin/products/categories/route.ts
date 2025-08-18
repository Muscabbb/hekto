/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/services/clerk";
import { canAccessAdminPage } from "@/permissions/general";
import { Role } from "@prisma/client";
import client from "@/lib/elastic/elasticClient";

const INDEX_NAME = process.env.INDEX_NAME || "hekto";

// GET - Fetch unique categories from existing products
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser({ allData: true });

    if (!user.data || !canAccessAdminPage(user.role as Role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch unique master categories
    const masterCategoriesResponse = await client.search({
      index: INDEX_NAME,
      size: 0,
      aggs: {
        unique_master_categories: {
          terms: {
            field: "masterCategory.keyword",
            size: 1000,
          },
        },
      },
    });

    // Fetch unique sub categories
    const subCategoriesResponse = await client.search({
      index: INDEX_NAME,
      size: 0,
      aggs: {
        unique_sub_categories: {
          terms: {
            field: "subCategory.keyword",
            size: 1000,
          },
        },
      },
    });

    // Fetch unique article types
    const articleTypesResponse = await client.search({
      index: INDEX_NAME,
      size: 0,
      aggs: {
        unique_article_types: {
          terms: {
            field: "articleType.keyword",
            size: 1000,
          },
        },
      },
    });

    // Extract categories from aggregation results
    const masterCategories =
      (
        masterCategoriesResponse.aggregations?.unique_master_categories as any
      )?.buckets?.map((bucket: any) => bucket.key) || [];

    const subCategories =
      (
        subCategoriesResponse.aggregations?.unique_sub_categories as any
      )?.buckets?.map((bucket: any) => bucket.key) || [];

    const articleTypes =
      (
        articleTypesResponse.aggregations?.unique_article_types as any
      )?.buckets?.map((bucket: any) => bucket.key) || [];

    return NextResponse.json({
      masterCategories: masterCategories.sort(),
      subCategories: subCategories.sort(),
      articleTypes: articleTypes.sort(),
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/services/clerk";
import { canAccessAdminPage } from "@/permissions/general";
import { Role } from "@prisma/client";
import client from "@/lib/elastic/elasticClient";

const INDEX_NAME = process.env.INDEX_NAME || "hekto";

// GET - Fetch all products
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser({ allData: true });

    if (!user.data || !canAccessAdminPage(user.role as Role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const from = parseInt(searchParams.get("from") || "0");
    const size = parseInt(searchParams.get("size") || "50");
    const search = searchParams.get("search") || "";

    let query: any = {
      match_all: {},
    };

    if (search) {
      query = {
        multi_match: {
          query: search,
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
      ...hit._source,
    }));

    return NextResponse.json({
      products,
      total: response.hits.total,
      from,
      size,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser({ allData: true });

    if (!user.data || !canAccessAdminPage(user.role as Role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const productData = await request.json();

    // Generate a new ID using timestamp but keeping it within 32-bit integer range
    // Use last 9 digits of timestamp to ensure it fits in 32-bit integer
    const timestamp = Date.now();
    const newId = parseInt(timestamp.toString().slice(-9));
    const product = {
      id: newId,
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Index the product in Elasticsearch
    await client.index({
      index: INDEX_NAME,
      id: newId.toString(),
      body: product,
    });

    // Refresh the index to make the document immediately searchable
    await client.indices.refresh({ index: INDEX_NAME });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/services/clerk";
import { canAccessAdminPage } from "@/permissions/general";
import { Role } from "@prisma/client";
import client from "@/lib/elastic/elasticClient";

const INDEX_NAME = process.env.INDEX_NAME || "hekto";

// GET - Fetch single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser({ allData: true });

    if (!user.data || !canAccessAdminPage(user.role as Role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const response = await client.get({
      index: INDEX_NAME,
      id: id,
    });

    if (!response.found) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const product = {
      id: (response._source as { id: number }).id,
      ...(response._source as Record<string, unknown>),
    };

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PUT - Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser({ allData: true });

    if (!user.data || !canAccessAdminPage(user.role as Role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const productData = await request.json();

    // Check if product exists
    const existingProduct = await client
      .get({
        index: INDEX_NAME,
        id: id,
      })
      .catch(() => null);

    if (!existingProduct?.found) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const updatedProduct = {
      ...(existingProduct._source as Record<string, unknown>),
      ...productData,
      id: parseInt(id),
      updatedAt: new Date().toISOString(),
    };

    // Update the product in Elasticsearch
    await client.index({
      index: INDEX_NAME,
      id: id,
      body: updatedProduct,
    });

    // Refresh the index
    await client.indices.refresh({ index: INDEX_NAME });

    return NextResponse.json({ product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser({ allData: true });

    if (!user.data || !canAccessAdminPage(user.role as Role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check if product exists
    const existingProduct = await client
      .get({
        index: INDEX_NAME,
        id: id,
      })
      .catch(() => null);

    if (!existingProduct?.found) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete the product from Elasticsearch
    await client.delete({
      index: INDEX_NAME,
      id: id,
    });

    // Refresh the index
    await client.indices.refresh({ index: INDEX_NAME });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

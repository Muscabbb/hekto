/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, syncClerkUserMetadata } from "@/services/clerk";
import { clerkClient } from "@clerk/nextjs/server";
import { canAccessAdminPage } from "@/permissions/general";
import { Role } from "@prisma/client";

// GET - Fetch all users with pagination and search
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser({ allData: true });

    if (!canAccessAdminPage(user.role as Role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const role = searchParams.get("role") || "";
    const status = searchParams.get("status") || "";

    const skip = (page - 1) * limit;

    // Build where clause for filtering
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    if (role && role !== "all") {
      where.role = role;
    }

    if (status === "active") {
      where.deletedAt = null;
    } else if (status === "deleted") {
      where.deletedAt = { not: null };
    }

    // Get users with pagination - handle null createdAt gracefully
    let users, totalCount;

    try {
      [users, totalCount] = await Promise.all([
        prisma.user.findMany({
          where,
          skip,
          take: limit,
          orderBy: [{ createdAt: "desc" }, { id: "desc" }],
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            imageUrl: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
            _count: {
              select: {
                interactions: true,
                payments: true,
              },
            },
          },
        }),
        prisma.user.count({ where }),
      ]);
    } catch (error) {
      // Fallback: order by id only if createdAt has issues
      console.warn(
        "CreatedAt ordering failed, falling back to id ordering:",
        error
      );
      [users, totalCount] = await Promise.all([
        prisma.user.findMany({
          where,
          skip,
          take: limit,
          orderBy: { id: "desc" },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            imageUrl: true,
            deletedAt: true,
            _count: {
              select: {
                interactions: true,
                payments: true,
              },
            },
          },
        }),
        prisma.user.count({ where }),
      ]);
    }

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// PUT - Update user role or status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, role, action } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const updateData: any = {};

    if (action === "updateRole" && role) {
      updateData.role = role;
    } else if (action === "activate") {
      updateData.deletedAt = null;
    } else if (action === "deactivate") {
      updateData.deletedAt = new Date();
    } else {
      return NextResponse.json(
        { error: "Invalid action or missing role" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    // Sync the updated user data with Clerk
    try {
      // Always sync metadata for role changes
      await syncClerkUserMetadata({
        id: updatedUser.id,
        clerkUserId: updatedUser.clerkUserId,
        role: updatedUser.role,
      });

      // Handle user activation/deactivation in Clerk
      const client = await clerkClient();
      if (action === "deactivate") {
        await client.users.banUser(updatedUser.clerkUserId);
      } else if (action === "activate") {
        await client.users.unbanUser(updatedUser.clerkUserId);
      }
    } catch (error) {
      console.error("Failed to sync user data with Clerk:", error);
      // Don't fail the request if Clerk sync fails, but log the error
    }

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

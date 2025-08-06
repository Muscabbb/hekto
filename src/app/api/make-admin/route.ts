import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    console.log("Making user admin with Clerk ID:", clerkUserId);

    // Find user in database
    const user = await prisma.user.findFirst({
      where: { clerkUserId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    console.log("Found user:", user);

    // Update user role to admin
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { role: "admin" },
    });

    console.log("Updated user in database:", updatedUser);

    // Update Clerk metadata
    try {
      await clerkClient.users.updateUserMetadata(clerkUserId, {
        publicMetadata: {
          role: "admin",
          dbId: user.id,
        },
      });
      console.log("Updated Clerk metadata successfully");
    } catch (clerkError) {
      console.error("Error updating Clerk metadata:", clerkError);
      return NextResponse.json(
        {
          error: "Failed to update Clerk metadata",
          details: clerkError,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "User successfully updated to admin",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error making user admin:", error);
    return NextResponse.json(
      { error: "Failed to make user admin", details: error },
      { status: 500 }
    );
  }
}

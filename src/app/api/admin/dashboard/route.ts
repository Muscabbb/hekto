import { NextResponse } from "next/server";
import { getCurrentUser } from "@/services/clerk";
import { canAccessAdminPage } from "@/permissions/general";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await getCurrentUser({ allData: true });

    if (!user.data || !canAccessAdminPage(user.role as Role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [totalUsers, totalPayments] = await Promise.all([
      prisma.user.count(),
      prisma.payment.count(),
    ]);

    const dashboardStats = {
      totalUsers,
      totalPayments,
    };

    return NextResponse.json(dashboardStats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}

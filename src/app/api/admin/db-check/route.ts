import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("=== DATABASE CHECK START ===");
    
    // Check database connection
    await prisma.$connect();
    console.log("✅ Database connection successful");
    
    // Count total users
    const totalUsers = await prisma.user.count();
    console.log("Total users in database:", totalUsers);
    
    // Count total payments
    const totalPayments = await prisma.payment.count();
    console.log("Total payments in database:", totalPayments);
    
    // Count completed payments
    const completedPayments = await prisma.payment.count({
      where: {
        status: "COMPLETED"
      }
    });
    console.log("Completed payments:", completedPayments);
    
    // Get sample users (first 3)
    const sampleUsers = await prisma.user.findMany({
      take: 3,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        role: true
      }
    });
    console.log("Sample users:", sampleUsers);
    
    // Get sample payments (first 3)
    const samplePayments = await prisma.payment.findMany({
      take: 3,
      select: {
        id: true,
        stripePaymentId: true,
        amount: true,
        status: true,
        createdAt: true,
        userId: true
      }
    });
    console.log("Sample payments:", samplePayments);
    
    // Get payment status distribution
    const paymentsByStatus = await prisma.payment.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    });
    console.log("Payments by status:", paymentsByStatus);
    
    console.log("=== DATABASE CHECK END ===");
    
    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        totalPayments,
        completedPayments,
        sampleUsers,
        samplePayments,
        paymentsByStatus,
        databaseConnected: true
      }
    });
  } catch (error) {
    console.error("Database check error:", error);
    return NextResponse.json(
      { 
        error: "Database check failed", 
        details: error instanceof Error ? error.message : String(error),
        databaseConnected: false
      },
      { status: 500 }
    );
  }
}
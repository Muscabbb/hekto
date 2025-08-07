import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    console.log("Creating test data...");
    
    // Create test users
    const testUsers = [];
    for (let i = 1; i <= 5; i++) {
      const user = await prisma.user.create({
        data: {
          clerkUserId: `test_user_${i}_${Date.now()}`,
          email: `testuser${i}@example.com`,
          name: `Test User ${i}`,
          role: "user",
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
        },
      });
      testUsers.push(user);
    }
    
    console.log(`Created ${testUsers.length} test users`);
    
    // Create test payments
    const testPayments = [];
    for (let i = 1; i <= 10; i++) {
      const randomUser = testUsers[Math.floor(Math.random() * testUsers.length)];
      const payment = await prisma.payment.create({
        data: {
          userId: randomUser.id,
          stripePaymentId: `pi_test_${i}_${Date.now()}`,
          amount: Math.floor(Math.random() * 200) + 20, // Random amount between $20-$220
          currency: "usd",
          status: "COMPLETED",
          productIds: [Math.floor(Math.random() * 100) + 1],
          customerEmail: randomUser.email,
          customerName: randomUser.name,
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
        },
      });
      testPayments.push(payment);
    }
    
    console.log(`Created ${testPayments.length} test payments`);
    
    return NextResponse.json({
      success: true,
      message: `Created ${testUsers.length} users and ${testPayments.length} payments`,
      users: testUsers.length,
      payments: testPayments.length,
    });
  } catch (error) {
    console.error("Error creating test data:", error);
    return NextResponse.json(
      { error: "Failed to create test data", details: error },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    console.log("Deleting test data...");
    
    // Delete test payments first (due to foreign key constraints)
    const deletedPayments = await prisma.payment.deleteMany({
      where: {
        stripePaymentId: {
          startsWith: "pi_test_",
        },
      },
    });
    
    // Delete test users
    const deletedUsers = await prisma.user.deleteMany({
      where: {
        clerkUserId: {
          startsWith: "test_user_",
        },
      },
    });
    
    console.log(`Deleted ${deletedPayments.count} payments and ${deletedUsers.count} users`);
    
    return NextResponse.json({
      success: true,
      message: `Deleted ${deletedUsers.count} users and ${deletedPayments.count} payments`,
      deletedUsers: deletedUsers.count,
      deletedPayments: deletedPayments.count,
    });
  } catch (error) {
    console.error("Error deleting test data:", error);
    return NextResponse.json(
      { error: "Failed to delete test data", details: error },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/services/clerk";

// Debug Prisma and MongoDB connection
console.log("=== CREATE-PAYMENT-INTENT PRISMA INITIALIZATION DEBUG ===");
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
console.log(
  "DATABASE_URL prefix:",
  process.env.DATABASE_URL?.substring(0, 20) + "..."
);
console.log("Using shared Prisma client from @/lib/prisma");

// Test database connection
prisma
  .$connect()
  .then(() =>
    console.log(
      "CREATE-PAYMENT-INTENT: Prisma connected to MongoDB successfully"
    )
  )
  .catch((error) =>
    console.error("CREATE-PAYMENT-INTENT: Prisma connection failed:", error)
  );

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

console.log(
  "CREATE-PAYMENT-INTENT: Stripe initialized with key prefix:",
  process.env.STRIPE_SECRET_KEY?.substring(0, 10) + "..."
);
console.log("=== CREATE-PAYMENT-INTENT INITIALIZATION COMPLETE ===");

export async function POST(request: NextRequest) {
  try {
    console.log("=== CREATE PAYMENT INTENT DEBUG START ===");

    const {
      amount,
      currency = "usd",
      productIds,
      products,
    } = await request.json();

    console.log("Request payload:", {
      amount,
      currency,
      productIds,
      products: products ? `${products.length} products` : "no products",
    });

    // Debug: Check user retrieval
    console.log("Retrieving current user...");
    const { data } = await getCurrentUser({ allData: true });
    console.log("User data retrieved:", {
      userId: data?.id,
      userExists: !!data,
      userType: typeof data?.id,
    });

    if (!data?.id) {
      console.warn("WARNING: No valid user ID found from getCurrentUser()");
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount already in cents from frontend
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId: data?.id || "anonymous",
        productIds: JSON.stringify(productIds || []),
      },
    });

    console.log("Stripe PaymentIntent created:", {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
      metadata: paymentIntent.metadata,
    });

    // Save payment record to database
    if (data?.id) {
      console.log("BEFORE prisma.payment.create() - Preparing data:");
      const paymentData = {
        userId: data?.id,
        stripePaymentId: paymentIntent.id,
        amount: amount / 100, // Convert back to dollars
        currency: "USD",
        status: "PENDING" as const,
        productIds: productIds || [],
        metadata: {
          products: products || [],
          paymentIntentId: paymentIntent.id,
        },
      };

      console.log("Payment data to be saved:", {
        userId: paymentData.userId,
        userIdType: typeof paymentData.userId,
        stripePaymentId: paymentData.stripePaymentId,
        stripePaymentIdType: typeof paymentData.stripePaymentId,
        amount: paymentData.amount,
        amountType: typeof paymentData.amount,
        currency: paymentData.currency,
        status: paymentData.status,
        productIds: paymentData.productIds,
        productIdsType: typeof paymentData.productIds,
        productIdsLength: paymentData.productIds?.length,
        metadata: paymentData.metadata,
        metadataType: typeof paymentData.metadata,
      });

      console.log("Calling prisma.payment.create()...");
      const createdPayment = await prisma.payment.create({
        data: paymentData,
      });

      console.log("AFTER prisma.payment.create() - Payment record created:", {
        id: createdPayment.id,
        userId: createdPayment.userId,
        stripePaymentId: createdPayment.stripePaymentId,
        amount: createdPayment.amount,
        status: createdPayment.status,
        productIds: createdPayment.productIds,
        metadata: createdPayment.metadata,
        createdAt: createdPayment.createdAt,
      });

      console.log("SUCCESS: Payment record inserted successfully!");
    } else {
      console.warn("SKIPPED: Payment record not created - no valid user ID");
    }

    console.log("=== CREATE PAYMENT INTENT DEBUG END ===");

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("ERROR in create-payment-intent:", error);
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack trace"
    );
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}

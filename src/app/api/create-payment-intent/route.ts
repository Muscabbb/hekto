import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

import { getCurrentUser } from "@/services/clerk";

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(request: NextRequest) {
  try {
    const {
      amount,
      currency = "usd",
      productIds,
      products,
    } = await request.json();
    const { data } = await getCurrentUser();

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

    // Save payment record to database
    if (data?.id) {
      await prisma.payment.create({
        data: {
          userId: data?.id,
          stripePaymentId: paymentIntent.id,
          amount: amount / 100, // Convert back to dollars
          currency: "USD",
          status: "PENDING",
          productIds: productIds || [],
          metadata: {
            products: products || [],
            paymentIntentId: paymentIntent.id,
          },
        },
      });
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}

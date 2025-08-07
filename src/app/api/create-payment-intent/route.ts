/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/services/clerk";

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

    const { data } = await getCurrentUser({ allData: true });

    if (!data?.id) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
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

    // Save payment record to database
    if (data?.id) {
      const paymentData = {
        userId: data?.id,
        stripePaymentId: paymentIntent.id,
        amount: amount / 100, // Convert back to dollars
        currency: "USD",
        status: "PENDING" as const,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        productIds: productIds.map((id: any) => Number(id)),
        metadata: {
          products: products || [],
          paymentIntentId: paymentIntent.id,
        },
      };

      await prisma.payment.create({
        data: paymentData,
      });
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}

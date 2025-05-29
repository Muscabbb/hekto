import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        // Update payment status to COMPLETED
        await prisma.payment.updateMany({
          where: {
            stripePaymentId: paymentIntent.id,
          },
          data: {
            status: "COMPLETED",
            updatedAt: new Date(),
          },
        });

        console.log("Payment succeeded:", paymentIntent.id);
        break;

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object as Stripe.PaymentIntent;

        // Update payment status to FAILED
        await prisma.payment.updateMany({
          where: {
            stripePaymentId: failedPayment.id,
          },
          data: {
            status: "FAILED",
            updatedAt: new Date(),
          },
        });

        console.log("Payment failed:", failedPayment.id);
        break;
      case "payment_intent.canceled":
        const canceledPayment = event.data.object as Stripe.PaymentIntent;

        // Update payment status to CANCELED
        await prisma.payment.updateMany({
          where: {
            stripePaymentId: canceledPayment.id,
          },
          data: {
            status: "CANCELED",
            updatedAt: new Date(),
          },
        });

        console.log("Payment canceled:", canceledPayment.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

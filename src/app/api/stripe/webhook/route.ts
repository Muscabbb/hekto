import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import dotenv from "dotenv";
dotenv.config();

// Debug Prisma and MongoDB connection
console.log("=== WEBHOOK PRISMA INITIALIZATION DEBUG ===");
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
console.log("DATABASE_URL prefix:", process.env.DATABASE_URL?.substring(0, 20) + "...");
console.log("Using shared Prisma client from @/lib/prisma");

// Test database connection
prisma.$connect()
  .then(() => console.log("WEBHOOK: Prisma connected to MongoDB successfully"))
  .catch((error) => console.error("WEBHOOK: Prisma connection failed:", error));

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "whsec_WyNdSIiDkNmN7CnQnt19K6bQq3EWWCF9",
  {
    apiVersion: "2025-04-30.basil",
  }
);

console.log("WEBHOOK: Stripe initialized with key prefix:", process.env.STRIPE_SECRET_KEY?.substring(0, 10) + "...");

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
console.log("=== WEBHOOK INITIALIZATION COMPLETE ===");

export async function POST(request: NextRequest) {
  try {
    console.log("=== STRIPE WEBHOOK DEBUG START ===");
    
    // Debug webhook secret validation
    console.log("Webhook secret validation:", {
      webhookSecretExists: !!webhookSecret,
      webhookSecretLength: webhookSecret?.length,
      webhookSecretPrefix: webhookSecret?.substring(0, 10) + "..."
    });
    
    const body = await request.text();
    const signature = request.headers.get("stripe-signature")!;
    
    console.log("Webhook request details:", {
      bodyLength: body.length,
      signatureExists: !!signature,
      signaturePrefix: signature?.substring(0, 20) + "..."
    });

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log("Webhook signature verification: SUCCESS");
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      console.error("Signature verification error details:", {
        error: err instanceof Error ? err.message : "Unknown error",
        webhookSecretUsed: webhookSecret?.substring(0, 10) + "...",
        signatureReceived: signature?.substring(0, 20) + "..."
      });
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
    
    console.log("Webhook event received:", {
      type: event.type,
      id: event.id,
      created: event.created,
      livemode: event.livemode
    });

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        console.log("=== PROCESSING PAYMENT_INTENT.SUCCEEDED ===");
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        console.log("Full event.data.object:", JSON.stringify(paymentIntent, null, 2));
        console.log("PaymentIntent details:", {
          id: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          status: paymentIntent.status,
          metadata: paymentIntent.metadata
        });
        
        // Check existing payment records before update
        console.log("Searching for existing payment with stripePaymentId:", paymentIntent.id);
        const existingPayments = await prisma.payment.findMany({
          where: {
            stripePaymentId: paymentIntent.id,
          },
        });
        
        console.log("Existing payments found:", {
          count: existingPayments.length,
          payments: existingPayments.map(p => ({
            id: p.id,
            userId: p.userId,
            stripePaymentId: p.stripePaymentId,
            status: p.status,
            amount: p.amount
          }))
        });
        
        if (existingPayments.length === 0) {
          console.warn("WARNING: No payment records found with stripePaymentId:", paymentIntent.id);
        }

        // Update payment status to COMPLETED
        console.log("Updating payment status to COMPLETED for stripePaymentId:", paymentIntent.id);
        const updateResult = await prisma.payment.updateMany({
          where: {
            stripePaymentId: paymentIntent.id,
          },
          data: {
            status: "COMPLETED",
            updatedAt: new Date(),
          },
        });
        
        console.log("Payment update result:", {
          count: updateResult.count,
          stripePaymentIdUsed: paymentIntent.id
        });
        
        if (updateResult.count === 0) {
          console.error("ERROR: No payments were updated! stripePaymentId mismatch?");
        } else {
          console.log("SUCCESS: Payment status updated to COMPLETED");
        }

        console.log("Payment succeeded:", paymentIntent.id);
        break;

      case "payment_intent.payment_failed":
        console.log("=== PROCESSING PAYMENT_INTENT.PAYMENT_FAILED ===");
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        
        console.log("Failed payment details:", {
          id: failedPayment.id,
          amount: failedPayment.amount,
          status: failedPayment.status,
          last_payment_error: failedPayment.last_payment_error
        });

        // Update payment status to FAILED
        const failedUpdateResult = await prisma.payment.updateMany({
          where: {
            stripePaymentId: failedPayment.id,
          },
          data: {
            status: "FAILED",
            updatedAt: new Date(),
          },
        });
        
        console.log("Failed payment update result:", {
          count: failedUpdateResult.count,
          stripePaymentIdUsed: failedPayment.id
        });

        console.log("Payment failed:", failedPayment.id);
        break;
        
      case "payment_intent.canceled":
        console.log("=== PROCESSING PAYMENT_INTENT.CANCELED ===");
        const canceledPayment = event.data.object as Stripe.PaymentIntent;
        
        console.log("Canceled payment details:", {
          id: canceledPayment.id,
          amount: canceledPayment.amount,
          status: canceledPayment.status
        });

        // Update payment status to CANCELED
        const canceledUpdateResult = await prisma.payment.updateMany({
          where: {
            stripePaymentId: canceledPayment.id,
          },
          data: {
            status: "CANCELED",
            updatedAt: new Date(),
          },
        });
        
        console.log("Canceled payment update result:", {
          count: canceledUpdateResult.count,
          stripePaymentIdUsed: canceledPayment.id
        });

        console.log("Payment canceled:", canceledPayment.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    console.log("=== STRIPE WEBHOOK DEBUG END ===");

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    console.error("Webhook error stack:", error instanceof Error ? error.stack : "No stack trace");
    console.error("Webhook error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      name: error instanceof Error ? error.name : "Unknown"
    });
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

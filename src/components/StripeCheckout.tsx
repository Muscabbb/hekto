"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
// import { useProductContext } from "@/context/ProductContext";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface CheckoutFormProps {
  amount: number;
  onSuccess: () => void;
}

const CheckoutForm = ({ amount, onSuccess }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create payment intent (amount in cents)
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: Math.round(amount * 100) }),
      });

      const { clientSecret } = await response.json();

      // Confirm payment
      const { error: paymentError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        }
      );

      if (paymentError) {
        setError(paymentError.message || "Payment failed");
      } else {
        onSuccess();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-md">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
            },
          }}
        />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <Button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-pink-600 text-white hover:bg-pink-700"
      >
        {isLoading ? "Processing..." : `Pay $${amount.toFixed(2)}`}
      </Button>
    </form>
  );
};

interface StripeCheckoutProps {
  amount: number;
  onSuccess: () => void;
}

const StripeCheckout = ({ amount, onSuccess }: StripeCheckoutProps) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} onSuccess={onSuccess} />
    </Elements>
  );
};

export default StripeCheckout;

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
import { useProductContext } from "@/context/ProductContext";
import { toast } from "sonner";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface CheckoutFormProps {
  amount: number;
  selectedItems: string[];
  onSuccess: () => void;
}

const CheckoutForm = ({
  amount,
  selectedItems,
  onSuccess,
}: CheckoutFormProps) => {
  const { state } = useProductContext();
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
      // Get selected products
      const selectedProducts = state.cart.filter((item) =>
        selectedItems.includes(item.id.toString())
      );

      // Create payment intent (amount in cents)
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100),
          productIds: selectedProducts.map((p) => p.id.toString()),
          products: selectedProducts,
        }),
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
        toast.error("Payment failed", {
          description: paymentError.message || "Please try again.",
        });
      } else {
        onSuccess();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Payment failed. Please try again.");
      toast.error("Payment failed", {
        description: "Please try again.",
      });
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
  selectedItems: string[];
  onSuccess: () => void;
}

const StripeCheckout = ({
  amount,
  selectedItems,
  onSuccess,
}: StripeCheckoutProps) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        amount={amount}
        selectedItems={selectedItems}
        onSuccess={onSuccess}
      />
    </Elements>
  );
};

export default StripeCheckout;

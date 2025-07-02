"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useProductContext } from "@/context/ProductContext";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import StripeCheckout from "@/components/StripeCheckout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const CartPage = () => {
  const {
    state: { cart },
    dispatch,
  } = useProductContext();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    if (selectAll) {
      setSelectedItems(cart.map((item) => item.id.toString()));
    } else {
      setSelectedItems([]);
    }
  }, [selectAll, cart]);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
  };

  const handleSelectItem = (productId: string, checked: boolean) => {
    setSelectedItems((prevSelectedItems) =>
      checked
        ? [...prevSelectedItems, productId]
        : prevSelectedItems.filter((id) => id !== productId)
    );
  };

  const calculateSubtotal = () => {
    return selectedItems.reduce((total, itemId) => {
      const item = cart.find((p) => p.id.toString() === itemId);
      return total + (item ? item.price * 1 : 0);
    }, 0);
  };

  const handleRemoveItem = (productId: number) => {
    const product = cart.find((item) => item.id === productId);
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: productId,
    });
    // Remove from selected items if it was selected
    setSelectedItems((prev) =>
      prev.filter((id) => id !== productId.toString())
    );

    // Show removal toast
    if (product) {
      toast.success("Item removed from cart", {
        description: `${product.productDisplayName} has been removed from your cart.`,
      });
    }
  };

  const handlePaymentSuccess = () => {
    // Clear selected items from cart
    selectedItems.forEach((itemId) => {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: parseInt(itemId),
      });
    });

    setSelectedItems([]);
    setSelectAll(false);
    setShowCheckout(false);

    // Show success toast
    toast.success("Payment successful!", {
      description:
        "Thank you for your purchase. Your order has been processed.",
      duration: 5000,
    });
  };

  const subtotal = calculateSubtotal();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-pink-600">Shopping cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="flex-grow">
          {/* Select All */}
          <div className="flex items-center mb-4">
            <Checkbox
              id="select-all"
              className="mr-2"
              checked={selectAll}
              onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
            />
            <label htmlFor="select-all" className="text-sm">
              Select all variations ({cart.length})
            </label>
          </div>

          {/* Vendor Section */}
          {cart.length > 0 && (
            <div className="border rounded-md p-4 mb-6">
              {/* Items */}
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-t pt-4"
                >
                  <Checkbox
                    id={`item-select-${item.id}`}
                    className="self-start mr-2"
                    checked={selectedItems.includes(item.id.toString())}
                    onCheckedChange={(checked) =>
                      handleSelectItem(item.id.toString(), checked as boolean)
                    }
                  />
                  <Image
                    src={item.image}
                    alt={item.productDisplayName}
                    width={80}
                    height={80}
                    unoptimized={true}
                    className="rounded-md"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.productDisplayName}</h3>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-700">
                        No specification
                      </span>
                      <span className="font-semibold text-pink-600 ml-2">
                        ${item.price.toFixed(2)} / piece
                      </span>
                      <span className="font-bold ml-auto">
                        ${(item.price * 1).toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-4"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 size={20} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {cart.length === 0 && (
            <div className="text-center text-gray-500">Your cart is empty.</div>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="w-full lg:w-80 border rounded-md p-4 bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            Order summary ({selectedItems.length} variations)
          </h2>
          <div className="flex justify-between mb-2">
            <span>Item subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Subtotal excl. tax</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
            <DialogTrigger asChild>
              <Button
                className="w-full bg-pink-600 text-white hover:bg-pink-700 transition-colors"
                disabled={selectedItems.length === 0}
              >
                Check out (${subtotal.toFixed(2)})
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Complete Your Payment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  Total: ${subtotal.toFixed(2)}
                </div>
                <StripeCheckout
                  amount={subtotal}
                  selectedItems={selectedItems}
                  onSuccess={handlePaymentSuccess}
                />
              </div>
            </DialogContent>
          </Dialog>

          <div className="mt-6 text-sm text-gray-500">
            <p className="flex items-center mb-2">
              <span className="mr-2">✔</span> {`You're`} protected on Hekt
            </p>
            <p className="flex items-center mb-2">
              <span className="mr-2">✔</span> Secure payment VISA Mastercard
              Amex PayPal Pay
            </p>
            <p className="flex items-center mb-2">
              <span className="mr-2">✔</span> Refund and returns
            </p>
            <p className="flex items-center">
              <span className="mr-2">✔</span> Fulfillment by Alibaba.com
              Logistics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Minus, Plus } from "lucide-react";
import Image from "next/image";

const CartPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-pink-600">Shopping cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="flex-grow">
          {/* Select All */}
          <div className="flex items-center mb-4">
            <input type="checkbox" id="select-all" className="mr-2" />
            <label htmlFor="select-all" className="text-sm">
              Select all variations (1)
            </label>
          </div>

          {/* Vendor Section */}
          <div className="border rounded-md p-4 mb-6">
            <div className="flex items-center mb-4">
              <input type="checkbox" id="vendor-select" className="mr-2" />
              <label htmlFor="vendor-select" className="font-semibold">
                Ningbo Zhenhai Gaoxin Punching Spares Factory
              </label>
            </div>

            {/* Item */}
            <div className="flex items-center gap-4 border-t pt-4">
              <input
                type="checkbox"
                id="item-select"
                className="self-start mr-2"
              />
              <Image
                src="/assets/imgs/chair1.png" // Placeholder image
                alt="Product Image"
                width={80}
                height={80}
                className="rounded-md"
              />
              <div className="flex-grow">
                <h3 className="font-medium">
                  Multi-color Mobile Phone Stand Lazy Mobile Phone Desktop Stand
                </h3>
                <p className="text-sm text-gray-500">Delivery by Jun 30</p>
                <p className="text-sm text-gray-500">Min. order: 1000 pieces</p>
                <div className="flex items-center mt-2">
                  <Image
                    src="/assets/imgs/chair1.png" // Placeholder image
                    alt="Specification Image"
                    width={30}
                    height={30}
                    className="rounded-sm mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    No specification
                  </span>
                  <span className="font-semibold text-pink-600 ml-2">
                    $1.60 / piece
                  </span>
                  <div className="flex items-center ml-auto">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                    >
                      <Minus size={16} />
                    </Button>
                    <Input
                      type="number"
                      value={2} // Placeholder value
                      className="w-12 text-center mx-2 h-8"
                      readOnly
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  <span className="font-bold ml-4">$3.20</span>
                  <Button variant="ghost" size="icon" className="ml-4">
                    <Trash2 size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="w-full lg:w-80 border rounded-md p-4 bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            Order summary (0 variations)
          </h2>
          <div className="flex justify-between mb-2">
            <span>Item subtotal</span>
            <span>0.00</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Subtotal excl. tax</span>
            <span>0.00</span>
          </div>
          <Button className="w-full bg-pink-600 text-white hover:bg-pink-700 transition-colors">
            <Trash2 size={16} className="mr-2" />
            Check out
          </Button>
          <div className="mt-6 text-sm text-gray-500">
            <p className="flex items-center mb-2">
              <span className="mr-2">✔</span> {"you're "}protected on Hekt
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

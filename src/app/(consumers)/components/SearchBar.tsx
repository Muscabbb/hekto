"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { SearchSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useProductContext } from "@/context/ProductContext";
import { toast } from "sonner";

export default function SearchBar() {
  const { dispatch } = useProductContext();
  const form = useForm({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SearchSchema>) => {
    try {
      // Set loading to true when search starts
      dispatch({ type: "SET_LOADING", payload: true });
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/parse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: data.search }),
      });

      const result = await response.json();
      
      // Check if the response has a rejected status with a reason
      if (result.status === 'rejected' && result.reason) {
        // Show the reason message to the user
        toast.error("Search Error", {
          description: result.reason,
          duration: 5000,
        });
        // Clear products or keep existing ones
        dispatch({ type: "SET_PRODUCTS", payload: [] });
      } else {
        // Normal successful response
        dispatch({ type: "SET_PRODUCTS", payload: result.products || [] });
      }
      
      console.log("Search result:", result);
    } catch (error) {
      console.error("Error posting search data:", error);
    } finally {
      // Set loading to false when search completes (success or error)
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Find Your Perfect Product
          </h2>
          <p className="text-gray-600">
            Search through thousands of products to find exactly what {`you're`}{" "}
            looking for
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
            <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="absolute left-4 text-gray-400">
                <Search className="w-6 h-6" />
              </div>

              <FormField
                control={form.control}
                name={"search"}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Input
                      {...field}
                      type="text"
                      placeholder="Search for products, brands, categories..."
                      className="w-full h-16 pl-14 pr-32 text-lg border-0 bg-transparent focus:ring-0 focus:outline-none placeholder:text-gray-400"
                    />
                    <FormMessage className="absolute top-full left-4 mt-2 text-red-500" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="absolute right-2 h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

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
      const response = await fetch("http://127.0.0.1:8000/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: data.search }),
      });

      const result = await response.json();
      dispatch({ type: "SET_PRODUCTS", payload: result.products }); // Update the products state with the search results
      console.log("Search result:", result);
    } catch (error) {
      console.error("Error posting search data:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container mx-auto my-5 flex w-full items-center"
      >
        <FormField
          control={form.control}
          name={"search"}
          render={({ field }) => (
            <FormItem className="flex-1/2">
              <Input
                {...field}
                type="text"
                placeholder="Search products..."
                className="w-full"
              />
              <FormMessage className="text-destructive my-2" />
            </FormItem>
          )}
        />

        <Button type="submit" className="ml-2">
          <Search />
        </Button>
      </form>
    </Form>
  );
}

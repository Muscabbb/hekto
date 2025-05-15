"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { SearchSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function SearchBar() {
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
      console.log("Search result:", result);
    } catch (error) {
      console.error("Error posting search data:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full">
        <FormField
          control={form.control}
          name={"search"}
          render={({ field }) => (
            <FormItem>
              <Input
                {...field}
                type="text"
                placeholder="Search products..."
                className="flex-1/2"
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

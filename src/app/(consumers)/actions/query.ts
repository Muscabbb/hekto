"use server";

import { SearchSchema } from "@/lib/validations";
import { z } from "zod";

export async function SearchQuery(data: z.infer<typeof SearchSchema>) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/parse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: data.search }),
    });

    if (!response.ok) {
      throw new Error("Failed to post search data");
    }
    return response;
  } catch (error) {
    console.error("Error posting search data:", error);
  }
}

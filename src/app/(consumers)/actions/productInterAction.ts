"use server";

import { prisma } from "@/lib/prisma";

type Actions = "view" | "add_to_cart" | "purchase";

export default async function productInterAction(
  productId: string,
  userId: string | undefined,
  action: Actions
) {
  // Only log interactions if user is authenticated
  if (!userId) {
    return;
  }

  const user = await prisma?.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  // Only create interaction if user exists in database
  if (user?.id) {
    await prisma?.interactions.create({
      data: {
        userId: user.id,
        productId: parseInt(productId),
        interactionType: action,
      },
    });
  }
}

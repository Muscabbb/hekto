"use server";

import { prisma } from "@/lib/prisma";

type Actions = "view" | "add_to_cart" | "purchase";

export default async function productInterAction(
  productId: string,
  userId: string,
  action: Actions
) {
  const user = await prisma?.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  await prisma?.interactions.create({
    data: {
      userId: user?.id as string,
      productId: parseInt(productId),
      interactionType: action,
    },
  });
}

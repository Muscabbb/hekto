"use server";

type Actions = "view" | "add_to_cart" | "purchase";

export default async function productInterAction(
  productId: string,
  userId: string,
  action: Actions
) {
  const user = await prisma?.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      interactions: true,
    },
  });
  if (!user) {
    return {
      error: "User not found",
    };
  }
  await prisma?.interactions.create({
    data: {
      userId: userId,
      productId: productId,
      interactionType: action,
    },
  });
}

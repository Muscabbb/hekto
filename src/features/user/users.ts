"use server";

import { SignUpFormValidation } from "@/lib/validations";
import { prisma } from "../../lib/prisma";
import { z } from "zod";
import { redirect } from "next/navigation";
export const createUser = async (
  userData: z.infer<typeof SignUpFormValidation>
) => {
  try {
    await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        age: userData.age,
        gender: userData.gender,
        location: userData.location,
        password: userData.password,
      },
    });
    redirect("/");
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

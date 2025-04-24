"use server";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    redirect("/");
  } catch (error) {
    throw error;
  }
};

const JWT_SECRET = process.env.JWT_SECRET;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateJwtToken(payload: any) {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export async function verifyJwtToken(token: string) {
  try {
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw error;
  }
}

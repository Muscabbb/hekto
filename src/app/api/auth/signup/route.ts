import { generateJwtToken } from "@/features/auth/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, name, age, gender, location } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        age,
        gender,
        location,
        password: hashedPassword,
      },
    });

    const token = generateJwtToken({ id: user.id, email: user.email });

    const response = new Response(JSON.stringify({ token }), { status: 201 });
    response.headers.set(
      "Set-Cookie",
      `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600`
    );

    return response;
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}

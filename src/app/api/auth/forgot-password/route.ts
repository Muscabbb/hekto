import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomInt } from "crypto";
import nodemailer from "nodemailer";

const OTP_EXPIRY_MINUTES = 5;

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  // Check if user exists
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  // Generate 4-digit OTP
  const otp = randomInt(1000, 9999).toString();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
  // Store OTP in DB (create or update)
  await prisma.oTP.upsert({
    where: { email },
    update: { otp, expiresAt },
    create: { email, otp, expiresAt },
  });
  // Send OTP via email
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
      minVersion: "TLSv1.2",
      // You can add more TLS options here if needed
    },
    logger: true,
    debug: true,
  });
  try {
    await transporter.sendMail({
      from: `"Hekto Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It is valid for ${OTP_EXPIRY_MINUTES} minutes.`,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error sending email:", err);
    if (err && err.code === "ESOCKET" && err.command === "CONN") {
      console.error(
        "Certificate verification failed. Consider checking your SMTP server's SSL certificate or TLS settings."
      );
      if (err.response) {
        console.error("SMTP Response:", err.response);
      }
      if (err.stack) {
        console.error("Stack Trace:", err.stack);
      }
    }
    return NextResponse.json({ error: err.message || err }, { status: 500 });
  }
  return NextResponse.json({ message: "OTP sent" });
}

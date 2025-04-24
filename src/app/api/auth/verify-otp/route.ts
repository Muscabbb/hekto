import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();
  if (!email || !otp) {
    return NextResponse.json(
      { error: "Email and OTP are required" },
      { status: 400 }
    );
  }
  const otpRecord = await prisma.oTP.findUnique({ where: { email } });
  if (!otpRecord) {
    return NextResponse.json({ error: "OTP not found" }, { status: 404 });
  }
  if (otpRecord.otp !== otp) {
    return NextResponse.json({ error: "Incorrect OTP" }, { status: 401 });
  }
  if (new Date() > otpRecord.expiresAt) {
    return NextResponse.json({ error: "OTP expired" }, { status: 410 });
  }
  // Optionally, delete OTP after successful verification
  await prisma.oTP.delete({ where: { email } });
  return NextResponse.json({ message: "OTP verified" });
}

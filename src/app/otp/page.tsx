"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { OTPFormValidation } from "@/lib/validations";

const OTPPage = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = { otp };
    const result = OTPFormValidation.safeParse(formData);
    if (!result.success) {
      setError(result.error.errors[0]?.message || "Invalid OTP");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post("/api/auth/verify-otp", {
        email,
        otp: result.data.otp,
      });
      if (response.status === 200) {
        router.push(`/reset-password?email=${encodeURIComponent(email ?? "")}`);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("OTP verification failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold">Enter OTP</h1>
        <p className="text-gray-600">
          Please enter the 6-digit OTP sent to your email.
        </p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter OTP"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default OTPPage;

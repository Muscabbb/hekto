"use client";
import { Form } from "../ui/form";
import { z } from "zod";
import { ForgetPasswordFormValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField from "../customForm";
import { useForm } from "react-hook-form";

import { useState } from "react";
import CustomButton from "../CustomButton";
import Link from "next/link";
import { FieldType } from "@/types/formTypes";

const ForgetForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof ForgetPasswordFormValidation>>({
    resolver: zodResolver(ForgetPasswordFormValidation),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof ForgetPasswordFormValidation>
  ) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      });
      if (response.ok) {
        // Redirect to OTP entry page with email as query param
        window.location.href = `/otp?email=${encodeURIComponent(values.email)}`;
      } else {
        const data = await response.json();
        alert(data.error || "Failed to send OTP. Try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex-1 ml-16"
      >
        <Link href={"login"} className="text-2xl font-bold">
          ←Back
        </Link>
        <section className="mb-12 space-y-2">
          <h1 className="header">Forgot Password 😩</h1>
          <p className="text-gray-600">
            Enter your registered email address. we’ll send you a code to reset
            your password.
          </p>
        </section>
        <CustomFormField
          control={form.control}
          name="email"
          label="Email"
          placeholder="example@gmail.com"
          fieldType={FieldType.TEXT}
        />

        <CustomButton isLoading={loading}>Send OTP</CustomButton>
      </form>
    </Form>
  );
};

export default ForgetForm;

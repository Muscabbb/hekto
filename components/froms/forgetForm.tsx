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

export enum FieldType {
  TEXT = "text",
  PASSWORD = "password",
  CHECK_BOX = "checkbox",
}

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
      console.log(values);
    } catch (error) {
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
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

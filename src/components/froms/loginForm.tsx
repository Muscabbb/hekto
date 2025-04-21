"use client";
import { Form } from "../ui/form";
import { z } from "zod";
import { LoginFormValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField from "../customForm";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { useState } from "react";
import CustomButton from "../CustomButton";
import { FieldType } from "@/types/formTypes";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginFormValidation>) => {
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex-1 ml-16"
      >
        <section className="mb-12 space-y-2">
          <h1 className="header">Hi There 👋</h1>
          <p className="text-gray-600 sub-header">please login here!</p>
        </section>
        <CustomFormField
          control={form.control}
          name="email"
          label="Email"
          placeholder="example@gmail.com"
          fieldType={FieldType.TEXT}
        />
        <CustomFormField
          control={form.control}
          name="password"
          label="Password"
          placeholder="enter your password here"
          fieldType={FieldType.PASSWORD}
        />
        <div className="flex justify-end items-center">
          <Link href={"/forget"} className=" font-medium">
            <span>forget password?</span>
          </Link>
        </div>
        <CustomButton isLoading={loading}>Login</CustomButton>
      </form>
    </Form>
  );
};

export default LoginForm;

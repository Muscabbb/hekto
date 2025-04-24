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
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginFormValidation>) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/api/auth/login", values);
      if (response.status === 200) {
        router.push("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex-1 ml-0 md:ml-16 px-4 md:px-0 w-full max-w-md"
      >
        <section className="mb-12 space-y-2">
          <h1 className="header">Hi There 👋</h1>
          <p className="text-gray-600 sub-header">please login here!</p>
          {error && <p className="text-red-500 text-sm">{error}</p>}
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

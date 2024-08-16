"use client";
import { Form } from "../ui/form";
import { z } from "zod";
import { SignUpFormValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField from "../customForm";
import { useForm } from "react-hook-form";

import { useState } from "react";
import CustomButton from "../CustomButton";

export enum FieldType {
  TEXT = "text",
  PASSWORD = "password",
  CHECK_BOX = "checkbox",
}

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof SignUpFormValidation>>({
    resolver: zodResolver(SignUpFormValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignUpFormValidation>) => {
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
        <section className="mb-12 space-y-2">
          <h1 className="header">Create New Account</h1>
          <p className="text-gray-400 sub-header">Please enter details</p>
        </section>
        <CustomFormField
          control={form.control}
          name="firstName"
          label="FirstName"
          placeholder="john"
          fieldType={FieldType.TEXT}
        />
        <CustomFormField
          control={form.control}
          name="lastName"
          label="LastName"
          placeholder="doe"
          fieldType={FieldType.TEXT}
        />
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

        <CustomButton isLoading={loading}>Signup</CustomButton>
      </form>
    </Form>
  );
};

export default SignUpForm;

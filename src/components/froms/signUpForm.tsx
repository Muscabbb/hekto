"use client";
import { Form } from "../ui/form";
import { z } from "zod";
import { SignUpFormValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField from "../customForm";
import { useForm } from "react-hook-form";

import { useState } from "react";
import CustomButton from "../CustomButton";
import { FieldType } from "@/types/formTypes";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof SignUpFormValidation>>({
    resolver: zodResolver(SignUpFormValidation),
    defaultValues: {
      name: "",
      email: "",
      age: 0,
      gender: "MALE",
      location: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignUpFormValidation>) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/signup", data);
      console.log(response);
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <section className="mb-8 space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create New Account</h1>
          <p className="text-gray-600">Please enter details</p>
        </section>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* First Row */}
          <CustomFormField
            control={form.control}
            name="name"
            label="Name"
            placeholder="John Doe"
            fieldType={FieldType.TEXT}
          />
          <CustomFormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="example@gmail.com"
            fieldType={FieldType.TEXT}
          />

          {/* Second Row */}
          <CustomFormField
            control={form.control}
            name="age"
            label="Age"
            placeholder="25"
            fieldType={FieldType.NUMBER}
          />
          <CustomFormField
            control={form.control}
            name="location"
            label="Location"
            placeholder="Mogadishu"
            fieldType={FieldType.TEXT}
          />

          {/* Third Row - Full width fields */}
          <div className="md:col-span-2">
            <CustomFormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="enter your password here"
              fieldType={FieldType.PASSWORD}
            />
          </div>
          <div className="md:col-span-2">
            <CustomFormField
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="confirm your password"
              fieldType={FieldType.PASSWORD}
            />
          </div>
          <div className="md:col-span-2">
            <CustomFormField
              control={form.control}
              name="gender"
              label="Gender"
              fieldType={FieldType.RADIO}
              genderOpt={["MALE", "FEMALE"]}
            />
          </div>
        </div>

        <CustomButton isLoading={loading} className="w-full">
          Signup
        </CustomButton>
      </form>
    </Form>
  );
};

export default SignUpForm;

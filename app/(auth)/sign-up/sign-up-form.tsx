"use client";
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { signIn } from "next-auth/react";
import { SignUpFormData, signUpSchema } from "@/lib/validator";

function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);
    setApiError("");
    try {
      // 1. Check if user exists
      const existingUsers = await axios.get(
        `http://localhost:5000/sign?email=${data.email}`
      );
      if (existingUsers.data.length > 0) {
        setApiError("User already exists with this email");
        setLoading(false);
        return;
      }

      // 2. Create new user
      await axios.post("http://localhost:5000/sign", {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });

      // 3. Auto-login using NextAuth credentials provider
      const result = await signIn("credentials", {
        redirect: true,
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });

      if (result?.error) setApiError(result.error);
      else alert("Account created & logged in successfully!");
    } catch (error: any) {
      setApiError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-yellow-100">
      <Paper className="p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <Title order={2} className="text-center mb-6 text-pink-600">
          Create Account
        </Title>

        {apiError && (
          <Text color="red" align="center" className="mb-4">
            {apiError}
          </Text>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Full Name"
            placeholder="John Doe"
            className="mb-2"
            {...register("fullName")}
            error={errors.fullName?.message}
          />
          <TextInput
            label="Email"
            placeholder="your@email.com"
            className="mb-2"
            {...register("email")}
            error={errors.email?.message}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            className="mb-2"
            {...register("password")}
            error={errors.password?.message}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            className="mb-2"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
          <Checkbox
            label="I agree to the Terms and Conditions"
            className="mb-4"
            {...register("terms")}
            error={errors.terms?.message as string}
          />
          <Button
            type="submit"
            fullWidth
            className="bg-pink-600 hover:bg-pink-700"
            loading={loading}
          >
            Sign Up
          </Button>
        </form>

        <Text align="center" className="mt-4 text-gray-500">
          Already have an account?{" "}
          <span className="text-pink-600 font-semibold cursor-pointer">
            Sign In
          </span>
        </Text>
      </Paper>
    </div>
  );
}

export default SignUpForm;

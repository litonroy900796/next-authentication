"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormData, signInSchema } from "@/lib/validator";
import {
  Button,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Text,
} from "@mantine/core";

function CredentialSignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setLoading(true);
    setApiError("");

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      console.log("📥 SignIn result:", result);

      if (result?.error) {
        setApiError("Invalid email or password. Please try again.");
        setLoading(false);
        return;
      }

      if (result?.ok) {
        console.log("✅ Login successful!");
        // Successful login - redirect
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("💥 Unexpected error:", error);
      setApiError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <Paper className="p-8 rounded-2xl shadow-xl w-full max-w-md">
        <Title order={2} className="text-center mb-6 text-purple-700">
          Welcome Back
        </Title>

        {apiError && (
          <Text className="text-red-500 mb-4 text-center">{apiError}</Text>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Email"
            {...register("email")}
            placeholder="galekowiqu@mailinator.com"
            className="mb-4"
            error={errors.email?.message}
          />
          <PasswordInput
            label="Password"
            {...register("password")}
            placeholder="Your password"
            className="mb-4"
            error={errors.password?.message}
          />
          <Button
            type="submit"
            loading={loading}
            fullWidth
            className="bg-purple-600 hover:bg-purple-700"
          >
            Sign In
          </Button>
        </form>

        <Text className="text-center mt-4 text-gray-500">
          Don't have an account?{" "}
          <span className="text-purple-600 font-semibold cursor-pointer">
            Sign Up
          </span>
        </Text>
      </Paper>
    </div>
  );
}

export default CredentialSignIn;

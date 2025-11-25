"use client";
import {
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

import React from "react";

function CredentialSignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-blue-100 to-purple-100">
      <Paper className="p-8 rounded-2xl shadow-xl w-full max-w-md">
        <Title order={2} className="text-center mb-6 text-purple-700">
          Welcome Back
        </Title>
        <TextInput
          label="Email"
          placeholder="your@email.com"
          className="mb-4"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          className="mb-4"
        />
        <Checkbox label="Remember me" className="mb-6" />
        <Button fullWidth className="bg-purple-600 hover:bg-purple-700">
          Sign In
        </Button>
        <Text align="center" className="mt-4 text-gray-500">
          Don’t have an account?{" "}
          <span className="text-purple-600 font-semibold cursor-pointer">
            Sign Up
          </span>
        </Text>
      </Paper>
    </div>
  );
}

export default CredentialSignIn;

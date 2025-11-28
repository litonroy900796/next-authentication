"use client";
import { Button, Card, Text, Title } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      <div className="min-h-screen bg-linear-to-r from-purple-100 to-blue-100 flex items-center justify-center p-5">
        <Card className="max-w-lg w-full p-10! rounded-2xl shadow-2xl bg-white">
          <Title order={2} className="text-center text-purple-700! mb-4!">
            Welcome to NextAuth Authentication
          </Title>

          <Text className="text-center! text-gray-600! mb-6!">
            You are successfully logged in 🎉
          </Text>

          <div className="bg-purple-50 rounded-xl p-4 shadow-inner mb-6">
            <Text className="text-purple-700! font-semibold">User Info:</Text>
            <Text className="text-gray-700! mt-2!">
              <strong>Name:</strong> {session?.user?.name}
            </Text>
            <Text className="text-gray-700! pt-2!">
              <strong>Email:</strong> {session?.user?.email}
            </Text>
          </div>

          <Button
            fullWidth
            className="bg-red-600! hover:bg-red-700! h-[46px]! text-white mt-3!"
            onClick={() => signOut({ callbackUrl: "/sign-in" })}
          >
            Logout
          </Button>
        </Card>
      </div>
    </div>
  );
}

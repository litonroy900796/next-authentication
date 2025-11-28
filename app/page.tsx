"use client";
import { Button } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();
  console.log("data", data);

  return (
    <div>
      <Button className="" onClick={() => signOut()}>
        Sign Out{" "}
      </Button>
    </div>
  );
}

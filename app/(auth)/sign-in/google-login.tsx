"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
function GoogleLogin() {
  const [isPending, setPending] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSignIn = async () => {
    setPending(true);
    try {
      await signIn("google", { redirectTo: callbackUrl });
    } catch (error) {
      console.error("Sign-in failed:", error);
    } finally {
      setPending(false);
    }
  };
  return (
    <div>
      <button
        onClick={handleSignIn}
        disabled={isPending}
        className="flex items-center mt-5 w-full gap-2 text-md border p-2 rounded-[3px] font-medium text-[15px] hover:bg-[#1d23840d] text-[#5d6974] border-[#dbdde0]"
      >
        {isPending ? (
          <>
            <FaGoogle size={20} /> Redirecting to Google...
          </>
        ) : (
          <>
            <FaGoogle size={20} /> Sign In with Google
          </>
        )}
      </button>
    </div>
  );
}

export default GoogleLogin;

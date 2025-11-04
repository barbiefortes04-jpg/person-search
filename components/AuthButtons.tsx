"use client"; // This is required in Next.js 13+ app directory

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="text-center mt-20">
        <p>Welcome, {session.user?.name}</p>
        <button className="mt-4" onClick={() => signOut()}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="text-center mt-20">
      <button onClick={() => signIn("google")}>Login with Google</button>
    </div>
  );
}

// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Create NextAuth handler using centralized auth options
const handler = NextAuth(authOptions);

// Export named HTTP methods required by Next.js 14 App Router
export { handler as GET, handler as POST };

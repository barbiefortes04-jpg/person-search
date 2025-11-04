// lib/auth.ts
import { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      // attach user id/email if needed
      session.user = session.user ?? { name: token.name, email: token.email };
      return session;
    },
  },
};

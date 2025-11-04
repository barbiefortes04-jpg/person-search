import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Person Search - OAuth Secured App",
  description: "OAuth-secured Person CRUD application with NextAuth v5 and Google OAuth",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}

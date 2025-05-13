import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - Sister Dashboard",
  description: "Authentication pages for Sister Dashboard",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  );
} 
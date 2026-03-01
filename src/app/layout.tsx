import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reward System",
  description: "Reward Plugin System - Earn points and redeem rewards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://cdn.tailwindcss.com" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

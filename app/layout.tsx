import type { Metadata } from "next";

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
      <body>
        {children}
      </body>
    </html>
  );
}

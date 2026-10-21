import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Product Catalog",
  description: "Search and manage a catalog of 100,000 healthcare products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}

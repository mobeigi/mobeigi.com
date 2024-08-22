import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BASE_URL, SITE_TITLE } from "@/constants/app";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: `%s - ${SITE_TITLE}`,
    default: `${SITE_TITLE}`
  },
  description: "Hi, I'm Mo! Welcome to my online portfolio. Dive into my programming blog and reach out if you're up for a chat.",
  alternates: {
    canonical: './',
  }
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

export default RootLayout;

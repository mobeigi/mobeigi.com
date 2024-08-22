import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { BASE_URL, SITE_TITLE } from "@/constants/app";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"],});

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
      <body className={roboto.className}>{children}</body>
    </html>
  );
}

export default RootLayout;

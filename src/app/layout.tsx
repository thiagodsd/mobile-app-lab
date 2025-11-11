import type { Metadata } from "next";
// import { Raleway } from "next/font/google";
import "./globals.css";

// const raleway = Raleway({
//   variable: "--font-raleway",
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
// });

export const metadata: Metadata = {
  title: "Educação na Computação",
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

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "SkillSphere - Upgrade Your Skills Today",
  description: "Learn high-demand industries from verified world experts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className="flex flex-col min-h-screen justify-between bg-base-100 antialiased">
        <Toaster position="top-center" reverseOrder={false} />
        <div>
          <Navbar />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
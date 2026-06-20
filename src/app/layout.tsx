import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"]
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Shikshak-Saarthi Classroom OS - AI-Powered Multilingual Teaching Assistant",
  description: "An interactive, dual-mode smart classroom OS for Indian teachers. Real-time voice intent router, Hinglish explanations, quizzes, and revision guides.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-[#FAF8F5] bg-grid-dots">
        {children}
      </body>
    </html>
  );
}

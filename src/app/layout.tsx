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
  if (process.env.SHIKSHAK_SAARTHI_LOCK !== "uu-shikshak-saarthi-authorized") {
    return (
      <html lang="en">
        <body style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          backgroundColor: "#0d0d0d",
          color: "#ff5252",
          textAlign: "center",
          padding: "20px"
        }}>
          <div>
            <h1 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "15px" }}>🛑 Unauthorized Usage Detected</h1>
            <p style={{ fontSize: "18px", color: "#a0a0a0", maxWidth: "500px", margin: "0 auto" }}>
              This Classroom OS application is private and proprietary. Setup, deployment, and execution are locked.
            </p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-[#FAF8F5] bg-grid-dots">
        {children}
      </body>
    </html>
  );
}


import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { LanguageProvider } from "./components/LanguageContext";

export const metadata: Metadata = {
  title: "Rivona4 Media",
  description: "Strategic Growth. Premium Execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
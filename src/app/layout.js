import { Inter } from "next/font/google";
import "./globals.css";
import AppNavbar from "@/components/Shared/AppNavbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppNavbar />
        {children}
        <Toaster position="top-right"/>
      </body>
    </html>
  );
}

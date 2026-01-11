import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/navbar/Navbar";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import MuiThemeProvider from "./theme-provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stillo - Buy and Sell Products",
  description: "An e-commerce platform to buy and sell products easily.",
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <MuiThemeProvider>
          <body
            className={`${geistSans.variable} ${poppins.variable} ${geistMono.variable} ${nunito.variable} `}
          >
            <Navbar />
            {children}
            {modal}
          </body>
        </MuiThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}

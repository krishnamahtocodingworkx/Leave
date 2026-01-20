import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/navbar/Navbar";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import MuiThemeProvider from "./theme-provider";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";
import ReduxProvider from "@/store/ReduxProvider";


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
  // title: "CW-NextJS Template",
  // description: "A Next.js template with MUI, Tailwind CSS, and Google Fonts integration.",
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
      <Providers>
        <AppRouterCacheProvider>
          <MuiThemeProvider>
            <body
              className={`${geistSans.variable} ${poppins.variable} ${geistMono.variable} ${nunito.variable} `}
            >
              <ReduxProvider>
                <Navbar />
                <div className="md:h-16 h-32" />
                {children}
                {modal}
                <Toaster />
              </ReduxProvider >
            </body>
          </MuiThemeProvider>
        </AppRouterCacheProvider>
      </Providers>
    </html >
  );
}

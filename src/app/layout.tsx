import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Sidebar from "@/components/layout/Sidebar";
import StoreProvider from "@/store/StoreProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ledgr - Personal Financial Tracker",
  description: "Track your spending, earnings, debts, and budgets with Ledgr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full bg-gray-100">
        <StoreProvider>
          <Toaster position="bottom-right" richColors />
          <Sidebar />
          <main className="flex-1 lg:ml-64">
            {children}
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}

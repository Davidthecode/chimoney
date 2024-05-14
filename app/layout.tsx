import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "./provider";

export const metadata: Metadata = {
  title: "Chimoney",
  description: "The ultimate payment infrastructure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`flex flex-col h-full`}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
};

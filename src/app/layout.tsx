// src/app/layout.tsx
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

import AuthProvider from "@/context/AuthProvider";

export const metadata = {
  title: "My App",
  description: "Next.js App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
        <Toaster theme="dark"  position="top-center" />
      </body>
    </html>
  );
}

"use client";
import { RootLayout } from "@/components/root-layout";

import "./global.scss";
import { Toaster } from "react-hot-toast";
import { TrpcProvider } from "@/components/trpc-provider";

import { UseAuth } from "@/shared/lib/hooks/use-auth";

export default function RLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  UseAuth();

  return (
    <html lang="en">
      <body>
        <TrpcProvider>
          <RootLayout>
            {children}
            <Toaster />
          </RootLayout>
        </TrpcProvider>
      </body>
    </html>
  );
}

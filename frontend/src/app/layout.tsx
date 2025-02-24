import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { Toaster } from "@/components/ui/sonner";
import { Session } from "next-auth";
import { SessionProviderWrapper } from "@/session/session-provider-wrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "The Art Gallery",
  description:
    "The Art Gallery ist eine Plattform für Kunstausstellungen und Events. Hier können Künstler ihre Aussstellungen erstellen und verwalten. Kunstliebhaber können sich registrieren und bei Events anmelden.",
};

export default function RootLayout({
  children,

  modal,
  session,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  session: Session;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] antialiased min-h-screen flex flex-col`}
      >
        <SessionProviderWrapper session={session}>
          <Header />
          <div className="flex-grow px-16 py-10 pt-36">
            {children}
            {modal}
          </div>
          <Footer />
          <Toaster />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { NextUIProvider } from "@nextui-org/react";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { StoreContextProvider } from "@/context/StoreContext";
import Footer from "@/components/Footer";
import SignupModal from "@/components/SignupModal";
import "primereact/resources/themes/lara-light-cyan/theme.css";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export const metadata: Metadata = {
  title: "DeliDish",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jetBrainsMono.variable}>
        <StoreContextProvider>
          <PrimeReactProvider>
            <NextUIProvider>
              <Header />
              <SignupModal />
              {children}
              <Footer/>
            </NextUIProvider>
          </PrimeReactProvider>
        </StoreContextProvider>
      </body>
    </html>
  );
}

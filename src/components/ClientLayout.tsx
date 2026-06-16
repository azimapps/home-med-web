"use client";

import { I18nProvider } from "@/lib/i18n";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RevealController from "./RevealController";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider>
      <Navbar />
      <main id="top">{children}</main>
      <Footer />
      <RevealController />
    </I18nProvider>
  );
}

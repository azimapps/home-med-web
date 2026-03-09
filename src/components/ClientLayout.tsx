"use client";

import { I18nProvider } from "@/lib/i18n";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </I18nProvider>
  );
}

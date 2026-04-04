import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

export const metadata: Metadata = {
  title: "Ape Platform — Chatbot com IA para condomínios",
  description:
    "Morador pergunta, o chatbot responde — com base no regimento do seu condomínio. Qualquer hora, sem precisar chamar o síndico.",
  openGraph: {
    title: "Ape Platform — Chatbot com IA para condomínios",
    description:
      "Morador pergunta, o chatbot responde — com base no regimento do seu condomínio.",
    url: "https://apeplatform.com",
    siteName: "Ape Platform",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

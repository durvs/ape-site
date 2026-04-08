import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://apeplatform.com"),
  alternates: { canonical: "/" },
  title: "Ape Platform — IA que opera seu condomínio",
  description:
    "Chatbot treinado no regimento, ata de assembleia automática, reserva de espaços, comunicados por WhatsApp e painel de gestão completo. Uma plataforma para administradoras e síndicos que não querem mais viver no grupo de WhatsApp.",
  openGraph: {
    title: "Ape Platform — IA que opera seu condomínio",
    description:
      "Chatbot treinado no regimento, ata de assembleia automática, reserva de espaços, comunicados por WhatsApp e painel de gestão completo.",
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

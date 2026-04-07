import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const bebasNeue = Bebas_Neue({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-bebas',
});

export const metadata: Metadata = {
  title: "Raid Dingues en 4L - 4L Trophy 2027",
  description: "Suivez l'aventure de notre équipage dans le 4L Trophy 2027. Une aventure humaine et solidaire à travers le désert marocain.",
  keywords: ["4L Trophy", "Raid humanitaire", "Désert", "Maroc", "Aventure", "Solidarité"],
  authors: [{ name: "Raid Dingues en 4L" }],
  openGraph: {
    title: "Raid Dingues en 4L - 4L Trophy 2027",
    description: "Une 4L, un défi, une aventure solidaire",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

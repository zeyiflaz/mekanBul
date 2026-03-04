import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google"; // [YORUM SATIRI]
import "./globals.css";

// [YORUM SATIRI] Google Fonts bağlantısını geçici olarak kapatıyoruz
/*
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
*/

export const metadata: Metadata = {
  title: "Mekan Bul - TÜBİTAK Projesi", // Burayı projenin adına göre güncelledim
  description: "Yapay zeka destekli mekan arama uygulaması",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr"> 
      <body
        className="antialiased" // Font değişkenlerini buradan sildim
      >
        {children}
      </body>
    </html>
  );
}
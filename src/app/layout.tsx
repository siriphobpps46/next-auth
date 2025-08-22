import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "ระบบจัดการผู้ใช้ - User Management System",
  description: "ระบบจัดการผู้ใช้ที่มีประสิทธิภาพ พร้อมระบบความปลอดภัยและการจัดการสิทธิ์ที่ครบครัน",
  keywords: ["user management", "authentication", "admin panel", "dashboard"],
  authors: [{ name: "Your Name" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={kanit.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${kanit.variable} antialiased font-kanit`}
        style={{ fontFamily: 'var(--font-kanit), Kanit, sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}

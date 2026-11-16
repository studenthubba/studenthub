import type { Metadata } from "next";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import Header from "./Header";

export const metadata: Metadata = {
  title: "StudentHub",
  description: "Stanovi, poslovi, skripte i cimeri za studente.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* OVO JE GLOBALNI CSS KOJI GARANTUJE BLUR I FIKCIRANJE */}
        <style>{`
          body {
            padding-top: 80px !important;
          }
          .top-nav {
            background: rgba(10, 10, 22, 0.7) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            z-index: 9999 !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
          }
          @media (max-width: 767px) {
            .top-nav {
              display: none !important;
            }
            body {
              padding-top: 0 !important;
            }
          }
          @media (min-width: 768px) {
            .top-nav {
              display: block !important;
            }
          }
        `}</style>
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
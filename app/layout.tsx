import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ResumeFree — Free Professional Resume Builder",
  description: "Build a professional resume in minutes. Free resume builder with multiple templates. No signup required. Download as PDF.",
  keywords: "resume builder, free resume, CV builder, resume template, create resume, PDF resume, professional resume",
  openGraph: {
    title: "ResumeFree — Free Professional Resume Builder",
    description: "Build a professional resume in minutes. 100% free, no signup required.",
    url: "https://resumefree.vercel.app",
    siteName: "ResumeFree",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-6737852115186889" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6737852115186889"
          crossOrigin="anonymous"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KEW4QFMVCN"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KEW4QFMVCN');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}

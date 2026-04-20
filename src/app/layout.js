import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/style.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://shubhampawar.net";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shubham Pawar | Full-Stack Web Developer",
    template: "%s | Shubham Pawar"
  },
  description: "Portfolio of Shubham Pawar, a passionate Full-Stack Developer specializing in React, Next.js, and Node.js. Based in Pune, India.",
  keywords: [
    "Shubham Pawar",
    "Shubham Pawar Developer",
    "Full Stack Developer Pune",
    "React Developer India",
    "Next.js Portfolio",
    "Web Developer Portfolio",
    "Software Engineer Pune",
    "MERN Stack Developer India",
  ],
  authors: [{ name: "Shubham Pawar" }],
  creator: "Shubham Pawar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Shubham Pawar | Full-Stack Web Developer",
    description: "Explore the portfolio of Shubham Pawar - Full-Stack Developer specializing in modern web technologies.",
    siteName: "Shubham Pawar Portfolio",
    images: [
      {
        url: "/images/Pass2.jpg",
        width: 1200,
        height: 630,
        alt: "Shubham Pawar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubham Pawar | Full-Stack Developer",
    description: "Full-Stack Developer portfolio of Shubham Pawar showcasing React & Next.js projects.",
    images: ["/images/Pass2.jpg"],
  },
  icons: {
    icon: "/fab.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import AOSInit from "@/components/AOSInit";

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Shubham Pawar",
    "url": SITE_URL,
    "jobTitle": "Full Stack Developer",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "addressCountry": "India"
    },
    "sameAs": [
      "https://www.linkedin.com/in/shubham-pawar1703/",
      "https://github.com/Shubhhya17"
    ],
    "knowsAbout": [
      "React", "Next.js", "Node.js", "MongoDB", "JavaScript", "TypeScript", "Web Development"
    ]
  };

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AOSInit />
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vtoy23fl7u");
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
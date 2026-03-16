import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/style.css";
import Script from "next/script"; // 1. Using the correct Next.js component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shubham Pawar",
  description: "Meet Shubham Pawar ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Correct way to add external CSS links */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        
        {/* 2. CORRECT CLARITY IMPLEMENTATION */}
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
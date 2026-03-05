import type { Metadata } from "next";

import "./globals.css";
import Layout from "@/components/layout/Layout";
import RoutePrefetcher from "@/components/layout/RoutePrefetcher";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { inter, jetbrainsMono } from "@/lib/fonts";

import { personalInfo } from "../../config/personal-info";

export const metadata: Metadata = {
  title: personalInfo.seo.metaTitle,
  description: personalInfo.seo.metaDescription,
  keywords: personalInfo.seo.keywords.join(", "),
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  publisher: personalInfo.name,
  openGraph: {
    title: personalInfo.seo.metaTitle,
    description: personalInfo.seo.metaDescription,
    url: personalInfo.seo.siteUrl,
    siteName: personalInfo.seo.siteName,
    images: [
      {
        url: personalInfo.seo.ogImage || "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: personalInfo.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: personalInfo.seo.metaTitle,
    description: personalInfo.seo.metaDescription,
    images: [personalInfo.seo.ogImage || "/images/og-image.jpg"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Blocking script to prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('portfolio-theme') || 'dracula';
                  document.documentElement.setAttribute('data-theme', storedTheme);
                  document.documentElement.style.colorScheme = 'dark';
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dracula');
                  document.documentElement.style.colorScheme = 'dark';
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ErrorBoundary>
          <LoadingProvider>
            <ThemeProvider>
              <Layout>{children}</Layout>
              <RoutePrefetcher />
            </ThemeProvider>
          </LoadingProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

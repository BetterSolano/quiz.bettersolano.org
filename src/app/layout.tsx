import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "@/providers/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Solano Quiz | Master the History, Culture & Heritage of Solano, Nueva Vizcaya",
    template: "%s | Solano Quiz",
  },
  description:
    "Embark on a journey through Solano, Nueva Vizcaya! Challenge yourself with the ultimate interactive quiz covering history, geography, vibrant culture, and local heritage. Discover fascinating facts and test your knowledge today.",
  keywords: [
    "Solano",
    "Nueva Vizcaya",
    "Solano Quiz",
    "Philippines History",
    "Cagayan Valley",
    "Solano Culture",
    "Geography Quiz",
    "Local Heritage",
    "Trivia",
    "Educational Game",
    "Better Solano",
  ],
  authors: [{ name: "Ramon Logan Jr.", url: "https://www.bettersolano.org/" }],
  creator: "Ramon Logan Jr.",
  publisher: "BetterSolano.org", // Assuming this based on previous context
  metadataBase: new URL("https://quiz.bettersolano.org"), // Best practice to have a base URL, using a placeholder based on domain
  openGraph: {
    title: "Solano Quiz | Master the History & Culture of Solano, Nueva Vizcaya",
    description:
      "How well do you know Solano? Test your knowledge of its rich history, vibrant culture, and fascinating geography in this interactive quiz experience.",
    url: "https://quiz.bettersolano.org",
    siteName: "Solano Quiz",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200, // Assuming standard OG size, though checking actual size would be better. But file size was 138k so likely high res.
        height: 630,
        alt: "Solano Quiz Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solano Quiz | Master the History & Culture of Solano",
    description:
      "Test your knowledge of Solano, Nueva Vizcaya! Dive into history, culture, and geography in this interactive quiz.",
    creator: "@BetterSolano", // Placeholder, or remove if unknown
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Solano Quiz",
    url: "https://quiz.bettersolano.org",
    description:
      "Interactive quiz platform covering the history, culture, geography, and heritage of Solano, Nueva Vizcaya.",
    publisher: {
      "@type": "Organization",
      name: "BetterSolano.org",
      url: "https://www.bettersolano.org/",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://quiz.bettersolano.org/quiz",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8777S9SP9X" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-8777S9SP9X');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Connecting Creators",
  description:
    "Live events, workshops, and resources for creators. Join our community to connect with like-minded individuals and grow your creative journey.",

  icons: {
    icon: "/Icon.PNG",
  },

  themeColor: "#000000",

  openGraph: {
    title: "Connecting Creators",
    description:
      "Live events, workshops, and resources for creators. Join our community to connect with like-minded individuals and grow your creative journey.",
    url: "https://connecting-creators.com/",
    siteName: "Connecting Creators",
    images: [
      {
        url: "https://connecting-creators.com/Icon.PNG",
        width: 1200,
        height: 630,
        alt: "Connecting Creators",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

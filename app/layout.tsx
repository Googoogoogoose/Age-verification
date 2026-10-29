import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

// Самый ранний вывод из встроенного браузера Instagram/Facebook, до загрузки картинок.
const EARLY_HANDOFF = `(function(){try{
var ua=navigator.userAgent||"";
if(/(?:^|[?&])ext=1(?:&|$)/.test(location.search))return;
var ig=/\\bInstagram\\b/i.test(ua),th=/Barcelona|Threads/i.test(ua);
var andIn=ig||th||/FBAN|FBAV|FB_IAB|Messenger|TikTok|musical_ly|BytedanceWebview|TTWebView|TwitterAndroid|Snapchat|\\bLine\\/|; wv\\)/i.test(ua);
var ios=/iPhone|iPad|iPod/i.test(ua);
var dest="https://"+location.host+location.pathname+"?ext=1";
var href=null;
if(/Android/i.test(ua)&&andIn){href="intent://"+location.host+location.pathname+"?ext=1#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url="+encodeURIComponent(dest)+";end";}
else if(ios&&ig){href="instagram://extbrowser/?url="+encodeURIComponent(dest);}
else if(ios&&th){href="barcelona://extbrowser/?url="+encodeURIComponent(dest);}
if(href)location.replace(href);
}catch(e){}})();`;

const AVATAR =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hf_20260910_150447_ddcc8977-0b6d-41a7-9e68-e8869d268a5a.PNG-4mEuNa7E8wBFmIXIY6FrSf1vHB5FJJ.jpeg";

export const metadata: Metadata = {
  metadataBase: new URL("https://hey-its-emily.com"),
  title: "Emily W.",
  description: "A private little corner. Come in and see the side that stays off the feed.",
  openGraph: {
    title: "Emily W.",
    description: "A private little corner. Come in and see the side that stays off the feed.",
    url: "https://hey-its-emily.com",
    siteName: "Emily W.",
    type: "website",
    images: [{ url: AVATAR, alt: "Emily W." }],
  },
  twitter: {
    card: "summary",
    title: "Emily W.",
    description: "A private little corner. Come in and see the side that stays off the feed.",
    images: [AVATAR],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} h-full antialiased bg-background`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: EARLY_HANDOFF }} />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

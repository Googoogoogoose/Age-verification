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
var dest="https://"+location.host+location.pathname+location.search;
var href=null;
if(/Android/i.test(ua)&&andIn){href="intent://"+location.host+location.pathname+location.search+"#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url="+encodeURIComponent(dest)+";end";}
else if(ios&&ig){href="instagram://extbrowser/"+encodeURIComponent(dest);}
else if(ios&&th){href="barcelona://extbrowser/"+encodeURIComponent(dest);}
if(href)location.replace(href);
}catch(e){}})();`;

export const metadata: Metadata = {
  title: "Age Verification",
  description: "Please confirm your age to continue",
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

"use client";

import { useEffect, useState } from "react";

// Instagram, Facebook и другие соцсети открывают ссылки во встроенном браузере.
// Там не работает вход через Google/Apple, нет сохранённых карт и Apple Pay,
// поэтому на Fanvue почти никто не доходит до оплаты. Выводим человека
// в системный браузер (Safari / Chrome), как это делают другие креаторы.
const IN_APP_RE = /Instagram|FBAN|FBAV|FB_IAB|FBIOS|Messenger|musical_ly|BytedanceWebview|TikTok|Snapchat|Line\/|Twitter/i;

type Platform = "ios" | "android" | "other";

function detect(): { inApp: boolean; platform: Platform } {
  const ua = navigator.userAgent || "";
  const platform: Platform = /iPhone|iPad|iPod/i.test(ua)
    ? "ios"
    : /Android/i.test(ua)
      ? "android"
      : "other";
  return { inApp: IN_APP_RE.test(ua), platform };
}

function externalUrl(platform: Platform, path: string): string | null {
  const { host } = window.location;
  if (platform === "ios") return `x-safari-https://${host}${path}`;
  if (platform === "android") {
    const fallback = encodeURIComponent(`https://${host}${path}`);
    return `intent://${host}${path}#Intent;scheme=https;S.browser_fallback_url=${fallback};end`;
  }
  return null;
}

export default function OpenInBrowser() {
  const [state, setState] = useState<{ inApp: boolean; platform: Platform }>({
    inApp: false,
    platform: "other",
  });

  useEffect(() => {
    const info = detect();
    setState(info);
    if (!info.inApp) return;

    const here = window.location.pathname + window.location.search;
    const url = externalUrl(info.platform, here);

    // Один автоматический переход за сессию, чтобы не зациклиться.
    let tried = false;
    try {
      tried = sessionStorage.getItem("escape-tried") === "1";
      sessionStorage.setItem("escape-tried", "1");
    } catch {}
    if (url && !tried) window.location.href = url;

    // Любая ссылка на сайт (например /vip) тоже уходит во внешний браузер.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("/")) return;
      const out = externalUrl(info.platform, href);
      if (!out) return;
      e.preventDefault();
      window.location.href = out;
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!state.inApp) return null;

  const open = () => {
    const here = window.location.pathname + window.location.search;
    const url = externalUrl(state.platform, here);
    if (url) window.location.href = url;
  };

  return (
    <div className="escape-bar" role="note">
      <p>
        {state.platform === "ios"
          ? <>For private access open this page in Safari: tap <b>•••</b> → <b>Open in external browser</b></>
          : <>For private access open this page in your browser: tap <b>⋮</b> → <b>Open in Chrome</b></>}
      </p>
      {state.platform !== "other" && (
        <button type="button" onClick={open}>Open in browser ↗</button>
      )}
    </div>
  );
}

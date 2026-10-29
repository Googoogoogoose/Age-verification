"use client";

import { useEffect, useState } from "react";

// Instagram, Facebook и другие соцсети открывают ссылки во встроенном браузере.
// Там не работает вход через Google/Apple, нет сохранённых карт и Apple Pay,
// поэтому на Fanvue почти никто не доходит до оплаты. Выводим человека
// в системный браузер так же, как это делает лендинг Мото Лолы:
// iOS Instagram понимает instagram://extbrowser/, Threads — barcelona://extbrowser/,
// на Android работает intent:// в Chrome.
// Чистый адрес без хвоста ?fbclid=..., который добавляет Instagram.
const SITE = "https://hey-its-emily.vercel.app";

type Mode = "android" | "instagram" | "threads" | null;

function detectMode(): Mode {
  const ua = navigator.userAgent || "";
  const instagram = /\bInstagram\b/i.test(ua);
  const threads = /Barcelona|Threads/i.test(ua);
  const androidInApp =
    instagram ||
    threads ||
    /FBAN|FBAV|FB_IAB|Messenger|TikTok|musical_ly|BytedanceWebview|TTWebView|TwitterAndroid|Snapchat|\bLine\/|; wv\)/i.test(ua);
  const ios = /iPhone|iPad|iPod/i.test(ua);
  if (/Android/i.test(ua) && androidInApp) return "android";
  if (ios && instagram) return "instagram";
  if (ios && threads) return "threads";
  return null;
}

function externalHref(mode: Mode, destination: string): string | null {
  if (mode === "android") {
    const url = new URL(destination);
    return (
      "intent://" + url.host + url.pathname + url.search +
      "#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=" +
      encodeURIComponent(destination) + ";end"
    );
  }
  if (mode === "instagram") return "instagram://extbrowser/" + encodeURIComponent(destination);
  if (mode === "threads") return "barcelona://extbrowser/" + encodeURIComponent(destination);
  return null;
}

// Пробуем открыть внешний браузер, а потом подстраховываемся обычной ссылкой,
// чтобы кнопка никогда не «молчала».
function openOutside(mode: Mode, destination: string) {
  const href = externalHref(mode, destination);
  if (!href) {
    window.location.href = destination;
    return;
  }
  window.location.href = href;
  // Если внешний браузер не открылся, через 1.5 с всё равно идём по обычной ссылке.
  setTimeout(() => { window.location.href = destination; }, 1500);
}

export default function OpenInBrowser() {
  const [mode, setMode] = useState<Mode>(null);

  useEffect(() => {
    const m = detectMode();
    setMode(m);
    if (!m) return;

    // Внутренние ссылки (например /vip) ведём через внешний браузер.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;
      const raw = a.getAttribute("href") || "";
      if (!raw.startsWith("/")) return;
      e.preventDefault();
      openOutside(m, SITE + raw.split("?")[0]);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!mode) return null;

  return (
    <div className="escape-bar" role="note">
      <p>
        {mode === "android"
          ? <>For private access open this page in your browser: tap <b>⋮</b> → <b>Open in Chrome</b></>
          : <>For private access open this page in Safari: tap <b>•••</b> → <b>Open in external browser</b></>}
      </p>
      <button
        type="button"
        onClick={() => openOutside(mode, SITE + window.location.pathname)}
      >
        Open in browser ↗
      </button>
    </div>
  );
}

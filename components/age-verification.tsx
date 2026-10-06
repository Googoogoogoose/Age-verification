"use client";

import { useState } from "react";

interface AgeVerificationProps {
  yesUrl: string;
  noUrl?: string;
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M21.7 3.4 18.6 20c-.2 1.2-.9 1.5-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.3-8.4c.4-.4-.1-.6-.6-.2L6 13.6l-4.9-1.5c-1.1-.3-1.1-1.1.2-1.6L20.5 3c.9-.3 1.6.2 1.2.4Z" />
    </svg>
  );
}

function SunIcon() {
  return <span aria-hidden="true" className="text-sm">☼</span>;
}

function MoonIcon() {
  return <span aria-hidden="true" className="text-sm">◐</span>;
}

export default function AgeVerification({ yesUrl, noUrl = "https://google.com" }: AgeVerificationProps) {
  const [leaving, setLeaving] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleYes = () => {
    setLeaving(true);
    setTimeout(() => {
      window.location.href = yesUrl;
    }, 1600);
  };

  return (
    <main className={darkMode ? "age-shell age-shell-dark" : "age-shell age-shell-light"}>
      <div className="age-hero" aria-hidden="true">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo-cmufjx6da0009361rs4azlh5m.png-QTKOZg5Vot9XwdHBCWDRgWYCcmasMc.jpeg"
          alt="Emily beside a pink motorcycle"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="age-noise" aria-hidden="true" />
      <header className="age-header">
        <div className="age-mark">PRIVATE</div>
        <button
          type="button"
          onClick={() => setDarkMode((current) => !current)}
          className="theme-toggle"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
          <span>{darkMode ? "Light" : "Dark"}</span>
        </button>
      </header>

      <section className={`age-content ${leaving ? "age-content-leaving" : ""}`}>
        <div className="profile-photo-wrap">
          <div className="profile-photo-ring" />
          <img src="/emily.png" alt="Emily W." className="profile-photo" />
        </div>
        <p className="profile-name">Emily W.</p>
        <h1>More than<br />the Instagram version.</h1>
        <p className="age-intro">
          A private little corner for grown-ups.<br />Come in and see the side that stays off the feed.
        </p>

        <div className="age-actions">
          <p className="age-label">PRIVATE ACCESS</p>
          <button type="button" onClick={handleYes} disabled={leaving} className="primary-action">
            Enter privately <span aria-hidden="true">↗</span>
          </button>
          <button type="button" onClick={() => { window.location.href = noUrl; }} disabled={leaving} className="secondary-action">
            I&apos;m not 18 yet
          </button>
        </div>

        <nav className="social-links" aria-label="Instagram and Telegram">
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><InstagramIcon /> Instagram</a>
          <a href="https://t.me/+Pk_Qh0gsprlhYTZi" target="_blank" rel="noreferrer"><TelegramIcon /> Telegram</a>
        </nav>
      </section>

      <footer className="age-footer">By entering, you confirm you are 18 or older.</footer>

      {leaving && (
        <div className="age-transition" role="status" aria-live="polite">
          <span>Welcome in.</span>
        </div>
      )}
    </main>
  );
}

"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

interface AgeVerificationProps {
  /** Ссылка, куда попадёт пользователь при нажатии "Yes, I am 18+" */
  yesUrl: string;
  /** Ссылка для отказа (по умолчанию google.com) */
  noUrl?: string;
}

const HeartIcon = ({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 21s-6.716-4.35-9.428-7.062C.86 12.226.5 9.91 1.62 8.05 2.66 6.32 4.94 5.79 6.7 6.86c.83.5 1.49 1.27 1.95 2.1.46-.83 1.12-1.6 1.95-2.1 1.76-1.07 4.04-.54 5.08 1.19 1.12 1.86.76 4.176-.952 5.888C18.716 16.65 12 21 12 21z" />
  </svg>
);

export default function AgeVerification({
  yesUrl,
  noUrl = "https://google.com",
}: AgeVerificationProps) {
  const [leaving, setLeaving] = useState(false);

  const handleYes = () => {
    setLeaving(true);
    setTimeout(() => {
      window.location.href = yesUrl;
    }, 1600);
  };

  const handleNo = () => {
    window.location.href = noUrl;
  };

  const floatingHearts = Array.from({ length: 14 });
  const burstHearts = Array.from({ length: 22 });

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-4">
      {/* Нежные фоновые сердечки */}
      <div className="pointer-events-none absolute inset-0">
        {floatingHearts.map((_, i) => {
          const left = (i * 7.3) % 100;
          const size = 12 + ((i * 13) % 22);
          const delay = (i % 7) * 0.9;
          const duration = 9 + ((i * 3) % 8);
          const opacity = 0.18 + (i % 4) * 0.08;
          return (
            <HeartIcon
              key={i}
              className="absolute text-accent animate-float-up"
              style={{
                left: `${left}%`,
                bottom: "-40px",
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            />
          );
        })}
      </div>

      {/* Карточка */}
      <div
        className={`relative w-full max-w-sm rounded-[2rem] bg-card p-8 text-center shadow-[0_20px_60px_-15px_rgba(255,126,182,0.45)] transition-all duration-500 ${
          leaving ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div className="mb-6 flex flex-col items-center">
          <div className="relative mb-3">
            <div className="absolute -inset-1.5 rounded-full bg-primary/40 blur-md animate-soft-pulse" />
            <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-card shadow-lg shadow-primary/30">
              <img
                src="/emily.png"
                alt="Emily W."
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary ring-4 ring-card">
              <HeartIcon className="h-3.5 w-3.5 text-primary-foreground animate-wiggle" />
            </div>
          </div>
          <div className="mb-2 flex items-center gap-1.5">
            <span className="text-sm font-bold text-foreground">Emily W.</span>
            <HeartIcon className="h-3.5 w-3.5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Hey cutie!</h1>
          <p className="mt-2 text-sm leading-relaxed text-foreground/60">
            This little corner is for grown-ups only. Just need to make sure
            you&apos;re old enough to come in!
          </p>
        </div>

        <div className="mb-6 rounded-2xl bg-muted/70 px-4 py-3">
          <p className="font-semibold text-foreground">Are you 18 or older?</p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleYes}
            disabled={leaving}
            className="group flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 px-6 font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-200 hover:scale-[1.03] hover:shadow-xl active:scale-95 disabled:opacity-70"
          >
            <HeartIcon className="h-4 w-4 transition-transform group-hover:scale-125" />
            Yes, I am 18+
          </button>
          <button
            onClick={handleNo}
            disabled={leaving}
            className="rounded-full bg-transparent py-2.5 px-6 text-sm font-medium text-foreground/40 transition-colors hover:text-foreground/70"
          >
            No, take me back
          </button>
        </div>

        <p className="mt-5 text-xs text-foreground/35">
          By tapping &quot;Yes&quot; you confirm you&apos;re of legal age
        </p>
      </div>

      {/* Анимация перехода после нажатия Yes */}
      {leaving && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm animate-fade-in">
          {burstHearts.map((_, i) => {
            const left = (i * 4.5 + 5) % 100;
            const size = 16 + ((i * 11) % 26);
            const delay = (i % 6) * 0.12;
            const duration = 1.4 + ((i * 5) % 10) / 10;
            return (
              <HeartIcon
                key={i}
                className="absolute text-primary animate-float-up"
                style={{
                  left: `${left}%`,
                  bottom: "-40px",
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                }}
              />
            );
          })}
          <div className="relative z-10 flex flex-col items-center">
            <div className="animate-heart-pop">
              <HeartIcon className="h-24 w-24 text-primary drop-shadow-[0_8px_20px_rgba(255,126,182,0.5)]" />
            </div>
            <p className="mt-4 text-lg font-bold text-foreground animate-fade-in">
              Welcome in, cutie!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

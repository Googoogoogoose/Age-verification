import Image from "next/image";

export default function AgeVerification() {
  return (
    <main className="age-shell age-shell-dark">
      <div className="age-hero" aria-hidden="true">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo-cmufjx6da0009361rs4azlh5m.png-QTKOZg5Vot9XwdHBCWDRgWYCcmasMc.jpeg"
          alt="Emily beside a pink motorcycle"
          fill
          priority
          sizes="100vw"
          quality={78}
        />
      </div>
      <div className="age-noise" aria-hidden="true" />
      <header className="age-header">
        <div className="age-mark">PRIVATE</div>
      </header>

      <section className="age-content">
        <div className="profile-photo-wrap">
          <div className="profile-photo-ring" />
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hf_20260910_150447_ddcc8977-0b6d-41a7-9e68-e8869d268a5a.PNG-4mEuNa7E8wBFmIXIY6FrSf1vHB5FJJ.jpeg"
            alt="Emily W."
            className="profile-photo"
            loading="eager"
            decoding="async"
          />
        </div>
        <p className="profile-name">Emily W.</p>
        <h1>More than<br />the Instagram version.</h1>
        <p className="age-intro">
          A private little corner for grown-ups.<br />Come in and see the side that stays off the feed.
        </p>

        <div className="age-actions">
          <p className="age-label">PRIVATE ACCESS</p>
          <a
            href="https://t.me/+R-hL3lGglts5Mjc6"
            target="_blank"
            rel="noopener noreferrer"
            className="primary-action"
          >
            Enter privately <span aria-hidden="true">↗</span>
          </a>
        </div>

        <a href="/vip" className="vip-link">
          <span aria-hidden="true">🔒</span>
          <span>VIP</span>
        </a>
      </section>

      <footer className="age-footer">By entering, you confirm you are 18 or older.</footer>

    </main>
  );
}

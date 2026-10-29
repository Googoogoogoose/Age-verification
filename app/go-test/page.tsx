// Тестовая страница: какие способы вывода из Instagram срабатывают на телефоне.
const SITE = "https://hey-its-emily.vercel.app/";
const enc = encodeURIComponent;

const variants = [
  { label: "A. instagram://extbrowser → наш сайт", href: "instagram://extbrowser/" + enc(SITE) },
  { label: "B. instagram://extbrowser → наш сайт с ?fbclid", href: "instagram://extbrowser/" + enc(SITE + "?fbclid=test123") },
  { label: "C. instagram://extbrowser → moto-lola.com", href: "instagram://extbrowser/" + enc("https://moto-lola.com/") },
  { label: "D. instagram://extbrowser → google.com", href: "instagram://extbrowser/" + enc("https://www.google.com/") },
  { label: "E. x-safari-https → наш сайт", href: "x-safari-https://hey-its-emily.vercel.app/" },
  { label: "F. googlechrome → наш сайт", href: "googlechrome://hey-its-emily.vercel.app/" },
];

export default function GoTest() {
  return (
    <main style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14, color: "#fff", background: "#0d0a0c", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 20, margin: 0 }}>Browser handoff test</h1>
      {variants.map((v) => (
        <a key={v.label} href={v.href} style={{ display: "block", padding: "14px 16px", borderRadius: 12, background: "#ff6fae", color: "#241018", fontWeight: 700, textDecoration: "none" }}>
          {v.label}
        </a>
      ))}
    </main>
  );
}

import { headers } from "next/headers";
import AgeVerification from "@/components/age-verification";

// Ссылки для каждого источника трафика
const TELEGRAM_LINKS = {
  source1: "https://t.me/+Pk_Qh0gsprlhYTZi", // аккаунт 1
  source2: "https://t.me/+1UaJSbD59JI4OGM6", // аккаунт 2
};

// Привязка доменов к ссылкам.
// Замени домены ниже на свои реальные домены (без https:// и без www).
// Левый домен -> аккаунт 1, правый домен -> аккаунт 2.
const DOMAIN_TO_LINK: Record<string, string> = {
  "domain1.com": TELEGRAM_LINKS.source1,
  "domain2.com": TELEGRAM_LINKS.source2,
};

export default async function Home() {
  const headersList = await headers();
  const host = (headersList.get("host") ?? "")
    .toLowerCase()
    .replace(/^www\./, "");

  // Если домен распознан — берём его ссылку, иначе по умолчанию аккаунт 1.
  const yesUrl = DOMAIN_TO_LINK[host] ?? TELEGRAM_LINKS.source1;

  return <AgeVerification yesUrl={yesUrl} />;
}

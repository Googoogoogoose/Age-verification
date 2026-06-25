import AgeVerification from "@/components/age-verification";

// Корневая страница по умолчанию (ведёт на аккаунт 1).
// Для разделения трафика используй пути /1 и /2.
export default function Home() {
  return <AgeVerification yesUrl="https://t.me/+Pk_Qh0gsprlhYTZi" />;
}

import AgeVerification from "@/components/age-verification";

// Трафик с Facebook: VIP ведёт на отдельную трекинг-ссылку Fanvue (fv-9)
export default function FacebookPage() {
  return <AgeVerification vipHref="/vip-fb" />;
}

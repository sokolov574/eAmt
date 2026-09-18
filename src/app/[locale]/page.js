import { setRequestLocale } from "next-intl/server";
import { locales } from "@/routing";

export default async function Home({ children, params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <>{children}</>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

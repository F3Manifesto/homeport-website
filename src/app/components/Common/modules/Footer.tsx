import { tParams } from "@/app/[lang]/layout";
import { getDictionary } from "@/app/[lang]/dictionaries";
import FooterEntry from "./FooterEntry";

export default async function Footer({ params }: { params: tParams }) {
  const { lang } = await params;
  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return <FooterEntry dict={dict} />;
}

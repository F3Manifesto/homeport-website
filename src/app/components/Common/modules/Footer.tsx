import { getDictionary } from "@/app/[lang]/dictionaries";
import FooterEntry from "./FooterEntry";
import { tParams } from "@/app/[lang]/layout";

export default async function Footer({ params }: { params: tParams }) {
  const { lang } = await params;

  const dict = await (getDictionary as (locale: any) => Promise<any>)(
    lang ?? "en"
  );
  return <FooterEntry dict={dict} lang={lang} />;
}

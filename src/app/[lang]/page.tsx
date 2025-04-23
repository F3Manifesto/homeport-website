import { tParams } from "@/app/[lang]/layout";
import { getDictionary } from "@/app/[lang]/dictionaries";
import Entry from "../components/Common/modules/Entry";

export default async function Home({ params }: { params: tParams }) {
  const { lang } = await params;
  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return <Entry dict={dict} />;
}

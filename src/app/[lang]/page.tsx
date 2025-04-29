import Entry from "../components/Common/modules/Entry";
import { tParams } from "../layout";
import { getDictionary } from "./dictionaries";

export default async function Home({ params }: { params: tParams }) {
  const { lang } = await params;
  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return <Entry dict={dict} />;
}

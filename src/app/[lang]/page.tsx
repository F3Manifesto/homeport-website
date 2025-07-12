import { Suspense } from "react";
import Entry from "../components/Common/modules/Entry";
import { getDictionary } from "./dictionaries";
import { tParams } from "./layout";
import RouterChange from "../components/Common/modules/RouterChange";

export default async function Home({ params }: { params: tParams }) {
  const { lang } = await params;
  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return (
    <Suspense fallback={<RouterChange />} >
      <Entry dict={dict} lang={lang} />
    </Suspense>
  );
}

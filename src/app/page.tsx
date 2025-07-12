import { Suspense } from "react";
import { getDictionary } from "./[lang]/dictionaries";
import Entry from "./components/Common/modules/Entry";
import Wrapper from "./components/Common/modules/Wrapper";
import RouterChange from "./components/Common/modules/RouterChange";
export default async function Home() {
  const dict = await (getDictionary as (locale: any) => Promise<any>)("en");
  return (
    <Wrapper
      dict={dict}
      page={
        <Suspense fallback={<RouterChange />}>
          <Entry dict={dict} lang={"en"} />
        </Suspense>
      }
    />
  );
}

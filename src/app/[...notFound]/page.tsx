import NotFoundEntry from "@/app/components/Common/modules/NotFoundEntry";
import { getDictionary } from "../[lang]/dictionaries";
import Wrapper from "../components/Common/modules/Wrapper";
import { Suspense } from "react";
import RouterChange from "../components/Common/modules/RouterChange";

export default async function NotFound() {
  const dict = await (getDictionary as (locale: any) => Promise<any>)("en");
  return (
    <Wrapper
      dict={dict}
      page={
        <Suspense fallback={<RouterChange />}>
          <NotFoundEntry dict={dict} />
        </Suspense>
      }
    />
  );
}

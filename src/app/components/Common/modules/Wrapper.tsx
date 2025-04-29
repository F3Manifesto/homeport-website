import { getDictionary } from "@/app/[lang]/dictionaries";
import FooterEntry from "./FooterEntry";
import { JSX } from "react";
import ModalsEntry from "../../Modals/modules/ModalsEntry";

export default async function Wrapper({ page }: { page: JSX.Element }) {
  const dict = await (getDictionary as (locale: any) => Promise<any>)("en");
  return (
    <>
      <div className="h-fit w-full bg-black relative cursor-empire selection:bg-lightYellow selection:text-lightYellow overflow-x-hidden flex flex-col">
        {page}
        <FooterEntry dict={dict} />
      </div>
      <ModalsEntry dict={dict} />
    </>
  );
}

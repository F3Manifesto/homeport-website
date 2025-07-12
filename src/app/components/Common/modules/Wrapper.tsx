import FooterEntry from "./FooterEntry";
import { JSX } from "react";
import ModalsEntry from "../../Modals/modules/ModalsEntry";

export default function Wrapper({
  dict,
  page,
}: {
  dict: any;
  page: JSX.Element;
}) {
  return (
    <>
      <div className="h-fit w-full bg-black relative cursor-empire selection:bg-lightYellow selection:text-lightYellow overflow-x-hidden flex flex-col">
        {page}
        <FooterEntry dict={dict} lang="en" />
      </div>
      <ModalsEntry dict={dict} />
    </>
  );
}

import { tParams } from "@/app/layout";
import Modals from "../../Modals/modules/Modals";
import Footer from "./Footer";

export default async function Layout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: tParams;
}) {
  return (
    <>
      <div className="h-fit w-full bg-black relative cursor-empire selection:bg-lightYellow selection:text-lightYellow overflow-x-hidden flex flex-col">
        {children}
        <Footer params={params} />
      </div>
      <Modals params={params} />
    </>
  );
}

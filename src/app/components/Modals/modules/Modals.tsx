import { tParams } from "@/app/layout";
import ModalsEntry from "./ModalsEntry";
import { getDictionary } from "@/app/[lang]/dictionaries";

export default async function Modals({ params }: { params: tParams }) {
  const { lang } = await params;

  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang ?? "en");
  return <ModalsEntry dict={dict} />;
}

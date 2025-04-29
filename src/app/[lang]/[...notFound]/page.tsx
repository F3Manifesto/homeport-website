import NotFoundEntry from "@/app/components/Common/modules/NotFoundEntry";
import { tParams } from "@/app/layout";
import { getDictionary } from "../dictionaries";

export default async function NotFound({ params }: { params: tParams }) {
  const { lang } = await params;

  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return <NotFoundEntry dict={dict} />;
}

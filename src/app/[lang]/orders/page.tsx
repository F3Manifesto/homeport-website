import OrdersEntry from "@/app/components/Orders/modules/OrdersEntry";
import { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import { tParams } from "../layout";
import { LOCALES } from "@/app/lib/constants";

export const generateMetadata = async ({
  params,
}: {
  params: tParams;
}): Promise<Metadata> => {
  const { lang } = await params;
  return {
    title: "Orders",
    metadataBase: new URL("https://f3manifesto.xyz/"),
    alternates: {
      canonical: `https://f3manifesto.xyz/${lang}/orders/`,
      languages: LOCALES.reduce((acc, item) => {
        acc[item] = `https://f3manifesto.xyz/${item}/orders/`;
        return acc;
      }, {} as { [key: string]: string }),
    },
  };
};

export default async function Orders({ params }: { params: tParams }) {
  const { lang } = await params;

  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return <OrdersEntry dict={dict} lang={lang} />;
}

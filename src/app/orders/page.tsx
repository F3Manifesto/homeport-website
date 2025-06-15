import OrdersEntry from "@/app/components/Orders/modules/OrdersEntry";
import { Metadata } from "next";
import { getDictionary } from "../[lang]/dictionaries";
import Wrapper from "../components/Common/modules/Wrapper";
import { Suspense } from "react";
import RouterChange from "../components/Common/modules/RouterChange";
import { LOCALES } from "../lib/constants";

export const metadata: Metadata = {
  title: "Orders",
  metadataBase: new URL("https://f3manifesto.xyz/orders/"),
  alternates: {
    canonical: `https://f3manifesto.xyz/orders/`,
    languages: LOCALES.reduce((acc, item) => {
      acc[item] = `https://f3manifesto.xyz/${item}/orders/`;
      return acc;
    }, {} as { [key: string]: string }),
  },
};

export default async function Orders() {
  const dict = await (getDictionary as (locale: any) => Promise<any>)("en");
  return (
    <Wrapper
      dict={dict}
      page={
        <Suspense fallback={<RouterChange />}>
          <OrdersEntry dict={dict} />
        </Suspense>
      }
    />
  );
}

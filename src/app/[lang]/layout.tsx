import Footer from "../components/Common/modules/Footer";
import Modals from "../components/Modals/modules/Modals";
export type tParams = Promise<{ lang: string }>;

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }, { lang: "ar" }, { lang: "ym" }];
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: tParams;
}>) {
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

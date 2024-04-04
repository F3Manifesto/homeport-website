import { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Custom404: NextPage = (): JSX.Element => {
  const { t } = useTranslation("404");
  return (
    <div className="relative flex items-center justify-center h-screen w-full cursor-empireA">
      <Head>
        <title>Glitch</title>
        <meta name="og:url" content={`https://f3manifesto.xyz/card.png`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative w-fit h-fit text-lightYellow font-fira p-6 text-center flex items-center justify-center break-all">
        {t("glitch")}{" "}
        <Link href="/">
          <a className="hover:opacity-80 cursor-empireS pl-2"> {t("home")}</a>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["404", "footer"])),
  },
});

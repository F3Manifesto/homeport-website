import Image from "next/image";
import { FunctionComponent, ReactElement } from "react";
import { BsTwitter } from "react-icons/bs";
import { INFURA_GATEWAY } from "../../../lib/constants";
import { FooterProps } from "../types/layout.types";
import { useTranslation } from "next-i18next";

const Footer: FunctionComponent<FooterProps> = ({
  randomFactory,
}): JSX.Element => {
  const { t } = useTranslation("footer");
  return (
    <div className="relative w-full h-fit flex items-center justify-center bg-black items-stretch cursor-empireA mb-0 flex-col md:flex-row gap-10 md:gap-3 pt-6 pb-2 px-4 text-white">
      <div className="relative w-fit min-h-full flex flex-col gap-3 items-start justify-between grow">
        <div className="relative w-fit h-fit text-left items-center justify-center flex font-futur text-lg w-5/6 md:w-72 tracking-widest leading-relaxed mt-0">
          {t("before")}
        </div>
        <div className="relative items-center justify-center w-fit h-fit text-sm font-futur mb-0 flex">
          Src: Claude
        </div>
      </div>
      <div className="relative w-full h-full flex flex-col gap-10 items-start justify-between">
        <div className="relative h-fit w-5/6 flex items-center justify-center text-left text-xs font-glitch leading-8 whitespace-pre-line">
          {t("prompt")}
        </div>
        <div className="relative h-fit w-fit text-sm font-futur flex items-center justify-center text-left mb-0">
          {t("log")}
        </div>
      </div>
      <div className="relative w-fit flex grow flex-col gap-3 items-start justify-between min-h-full">
        <div className="relative flex items-start md:items-center justify-center flex-col gap-2 w-fit h-fit flex-wrap sm:flex-nowrap">
          <div className="relative w-fit h-fit flex items-center justify-center flex-row gap-1.5">
            <div className="relative font-fira text-xs w-fit h-fit flex items-center justify-center text-white">
              {t("feed")}
            </div>
            <div className="relative h-4 w-4 flex items-center justify-center rounded-full opacity-75 animate-ping bg-green-500"></div>
            <div className="absolute right-px flex items-center justify-center rounded-full h-3 w-3 bg-green-300"></div>
          </div>
          <div className="w-fit h-fit flex items-center justify-start md:justify-center relative">
            <video
              className="relative w-3/4 galaxy:w-48 sm:w-60 h-fit min-h-fit object-cover flex items-center justify-start md:justify-center"
              autoPlay
              muted
              loop
            >
              <source
                src={`${INFURA_GATEWAY}/ipfs/${randomFactory}`}
                type="video/mp4"
              />
            </video>
          </div>
        </div>
        <div className="relative w-full h-fit flex items-end mr-0 mb-0 justify-start md:justify-end gap-2 flex-row">
          {[
            {
              link: "https://mirror.xyz/f3manifesto.eth",
              image: "QmVBiKdFNfb7p8TCiaiHFiof3Z3cWJ1SFAPackcKr3m5SU",
              title: "Mirror",
            },
            {
              link: "https://github.com/f3manifesto",
              image: "QmTgYZMe5qgaFCBoSicsr6sdEJmfguqwPzQ2CEFLTXWvMA",
              title: "Github",
            },
            {
              link: "https://cypher.digitalax.xyz/autograph/f3manifesto",
              image: "QmamuDJVJw4BoWUrnRdE4GVabsbUFsYPysqzQn3pfeTPL9",
              title: t("auto"),
            },
            {
              link: "https://twitter.com/f3manifestoo",
              component: <BsTwitter size={30} color={"#FCF894"} />,
              title: "Twitter",
            },
            {
              link: "https://youtube.com/@f3manifesto",
              image: "QmVCdoxVzrTLwzht4L11VJp2Kove61EJobtoxzCzoEK6Go",
              title: "Youtube",
            },
          ].map(
            (
              item: {
                image?: string;
                title: string;
                component?: ReactElement;
                link: string;
              },
              index: number
            ) => {
              return (
                <div
                  title={item.title}
                  key={index}
                  className="relative w-fit h-fit flex items-center justify-center cursor-empireS"
                >
                  <div
                    className="relative w-5 h-5 flex items-center justify-center"
                    onClick={() => window.open(item.link)}
                  >
                    {item.component ? (
                      item.component
                    ) : (
                      <Image
                        layout="fill"
                        draggable={false}
                        src={`${INFURA_GATEWAY}/ipfs/${item.image}`}
                      />
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
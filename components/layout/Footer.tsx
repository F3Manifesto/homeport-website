import Image from "next/image";
import { FunctionComponent, useEffect, useState } from "react";
import useFooter from "./hooks/useLayout";
import { BsTwitter } from "react-icons/bs";
import Link from "next/link";

const Footer: FunctionComponent = (): JSX.Element => {
  const { randomImages, randomMicrofactory } = useFooter();
  useEffect(() => {
    if (!randomMicrofactory) {
      randomImages();
    }
  }, []);
  const [blur, setBlur] = useState<boolean>(true);
  return (
    <div className="min-w-screen relative h-auto min-h-full flex w-full cursor-empireA">
      <div className="relative grid auto-cols-[auto auto] grid-flow-col h-full text-foot w-full gap-3 bottom-0 pt-12">
        <div className="text-lg h-fit relative font-futur w-5/6 md:w-72 h-full tracking-widest leading-relaxed relative col-start-1 row-start-1 pl-10">
          Before you go, let’s take a look at what the latest language synth
          model has to say for itself…
        </div>
        <div className="relative justify-end w-fit text-sm font-futur col-start-1 row-start-3 md:row-start-2 self-end h-fit pl-10 md:pt-0 pt-10">
          Src: Ryte GPT-3
        </div>
        <div className="relative h-fit w-fit md:w-fit text-xs font-glitch w-fit leading-8 col-start-1 row-start-2 md:col-start-2 md:row-start-1 pr-10 md:pr-32 pl-10">
          This high-end designer is working night and day to make a beautiful
          garment. Shouldn't it be easy for you to find the perfect design? Be
          more than just a silhouette. <br /> <br /> Once a fashion designer,
          now the craziest scientist of the century. The result of many hours of
          research, design, and planning. this garment is meticulously
          engineered for a high-end fashionista. With a little care and some
          love, this design will stay in your closet for years to come. I spent
          all night making this.
        </div>
        <div className="relative h-fit w-fit text-sm font-futur col-start-1 md:col-start-2 row-start-4 md:row-start-2 pl-10 md:pl-0 self-end">
          log: 0001
        </div>
        <div className="relative col-start-1 row-start-5 md:col-start-3 md:row-start-1 h-fit w-fit pl-10 pt-16 md:pt-0 md:pl-0 md:pr-4">
          <div className="relative grid auto-cols-[auto auto] grid-flow-col gap-2 h-fit max-w-fit w-fit">
            <div className="text-white w-fit h-fit text-sm font-fira relative float-left col-start-1 row-start-1">
              Latent microfactory feed
            </div>
            <div className="relative h-fit w-fit self-center -top-2 col-start-2 row-start-1">
              <div className="absolute h-3 w-3 rounded-full opacity-75 animate-ping bg-green-100"></div>
              <div className="absolute rounded-full h-3 w-3 bg-green-500"></div>
            </div>
          </div>
          <div className="w-fit h-fit block relative pb-24 pt-2 flex flex-col">
            {randomMicrofactory && (
              <video
                className="relative w-48 sm:w-60 h-fit min-h-fit object-cover"
                autoPlay
                muted
                loop
                placeholder="blur"
              >
                <source
                  src={`/videos/studiofeed/${randomMicrofactory}.mp4`}
                  type="video/mp4"
                />
              </video>
            )}
          </div>
        </div>
        <div className="relative h-fit w-full md:w-fit pl-10 pb-4 md:pb-0 md:pl-0 flex justify-self-end row-start-6 md:row-start-2 col-start-1 md:col-start-3 self-start md:self-end pr-4">
          <Link href={"https://twitter.com/f3manifesto"}>
            <a
              target="_blank"
              rel="noreferrer"
              className="cursor-empireS mr-4 h-fit relative"
            >
              <BsTwitter size={30} color={"#FCF894"} />
            </a>
          </Link>
          <Link href={"https://lenster.xyz/u/f3manifesto.lens"}>
            <a
              target="_blank"
              rel="noreferrer"
              className="cursor-empireS h-fit relative"
            >
              <Image src={"/images/lens.png"} width={30} height={30} />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;

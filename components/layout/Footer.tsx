import Image from "next/image";
import { FunctionComponent, useEffect } from "react";
import useFooter from "./hooks/useLayout";
import { BsTwitter } from "react-icons/bs";
import Link from "next/link";

const Footer: FunctionComponent = (): JSX.Element => {
  const { randomImages, randomMicrofactory } = useFooter();
  useEffect(() => {
    randomImages();
  }, []);
  return (
    <div className="min-w-screen relative h-auto flex w-full cursor-empireA">
      <div className="absolute grid auto-cols-[auto auto] grid-flow-col w-2/3 h-full top-10 text-foot w-full">
        <div className="text-lg h-fit relative font-futur w-72 h-full tracking-widest leading-relaxed relative col-start-1 row-start-1 pl-10">
          Before you go, let’s take a look at what the latest language synth
          model has to say for itself…
        </div>
        <div className="relative justify-end w-fit text-sm font-futur col-start-1 row-start-2 self-end h-fit pl-10">
          Src: Ryte GPT-3
        </div>
        <div className="relative h-fit w-fit text-xs font-glitch w-fit leading-8 col-start-2 row-start-1 pr-32 pl-10">
          This high-end designer is working night and day to make a beautiful
          garment. Shouldn't it be easy for you to find the perfect design? Be
          more than just a silhouette. <br /> <br /> Once a fashion designer,
          now the craziest scientist of the century. The result of many hours of
          research, design, and planning. this garment is meticulously
          engineered for a high-end fashionista. With a little care and some
          love, this design will stay in your closet for years to come. I spent
          all night making this.
        </div>
        <div className="relative h-fit w-fit text-sm font-futur col-start-2 row-start-2 self-end pl-10">
          log: 0001
        </div>
        <div className="relative col-start-3 row-start-1 h-auto w-auto pr-4">
          <div className="relative grid auto-cols-[auto auto] grid-flow-col gap-2 h-fit max-w-fit w-fit">
            <div className="text-white w-fit h-fit text-sm font-fira relative float-left">
              Latent microfactory feed
            </div>
            <div className="relative h-fit w-fit self-center -top-2">
              <div className="absolute h-3 w-3 rounded-full opacity-75 animate-ping bg-green-100"></div>
              <div className="absolute rounded-full h-3 w-3 bg-green-500"></div>
            </div>
          </div>
          <div className="w-fit h-fit block relative pb-24 pt-2 flex flex-col">
            <Image
              width={250}
              height={250}
              src={`/images/studiofeed/${randomMicrofactory}.gif`}
            />
          </div>
        </div>
        <div className="relative h-fit w-fit flex justify-self-end row-start-2 col-start-3 self-end pr-4">
          <Link href={"https://twitter.com/f3manifesto"}>
            <a
              target="_blank"
              rel="noreferrer"
              className="cursor-empireS mr-4 h-fit"
            >
              <BsTwitter size={30} color={"#FCF894"} />
            </a>
          </Link>
          <Link href={"https://lenster.xyz/u/f3manifesto.lens"}>
            <a
              target="_blank"
              rel="noreferrer"
              className="cursor-empireS h-fit"
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

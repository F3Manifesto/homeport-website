import Image from "next/image";
import { FunctionComponent, useEffect } from "react";
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
  return (
    <div className="min-w-screen relative h-auto min-h-full flex w-full cursor-empireA">
      <div className="relative grid auto-cols-auto grid-flow-col h-full text-foot w-full gap-3 bottom-0 pt-12 z-0">
        <div className="text-lg h-fit relative font-futur w-5/6 md:w-72 h-full tracking-widest leading-relaxed relative col-start-1 row-start-1 pl-10">
          Before you go, let’s take a look at what the latest language synth
          model has to say for itself…
        </div>
        <div className="relative justify-end w-fit text-sm font-futur col-start-1 row-start-3 md:row-start-3 self-end h-fit pl-10 md:pt-0 pt-10">
          Src: ChatGPT
        </div>
        <div className="relative w-60 lg:w-72 h-fit text-white font-firaL grid grid-flow-row auto-rows-auto pl-10 row-start-5 md:row-start-2 text-xs pt-6 md:pt-0 pb-2 md:pb-12">
          <div className="relative row-start-1 w-fit h-fit place-self-start pr-6">
            Visual media used by this site is mirrored using IPFS{" "}
            <Link href={"https://ipfs.f3manifesto.xyz/"}>
              <a
                target={"_blank"}
                rel="noreferrer"
                className="underline decoration-midWhite decoration-1 underline-offset-4 cursor-empireS hover:text-lightYellow"
              >
                here.
              </a>
            </Link>
          </div>
          <div className="relative row-start-2 w-fit h-fit place-self-start pt-2 pr-6">
            <sup>*</sup>Some US based ISPs may block these links, we’re looking
            into why.
          </div>
        </div>
        <div className="relative h-fit w-fit md:w-fit text-xs font-glitch w-fit leading-8 col-start-1 row-start-2 md:col-start-2 md:row-start-1 pr-10 md:pr-32 pl-10">
          In the forgotten corners of the world, a group of weavers had set out
          to challenge the very foundations of the fashion industry. Their
          mission was simple yet bold: to create a new paradigm of production,
          one that was free, open, and accessible to all. Armed with
          cutting-edge web3 and AI technologies, they designed a new kind of
          loom that could be built using basic materials, giving rise to a wave
          of grassroots innovation and creativity that spread like wildfire.
          <br /> <br />
          Their workshops became sanctuaries of the new industry, where the most
          talented and visionary fashion designers gathered to learn the secrets
          of the weavers' craft. Every thread they spun was infused with the
          magic of their dreams, forming an intricate tapestry that shimmered
          under the dim light of the ancient moon. But their path was fraught
          with danger, as the old guard of the fashion industry fought tooth and
          nail to maintain their grip on power and profit.
        </div>
        <div className="relative h-fit w-fit text-sm font-futur col-start-1 md:col-start-2 row-start-4 md:row-start-3 pl-10 self-end">
          log: 0011
        </div>
        <div className="relative col-start-1 row-start-6 md:row-start-4 md:col-start-1 lg:col-start-3 lg:row-start-1 h-fit w-fit pl-10 pt-4 md:pt-10 lg:pt-0 lg:pl-0 lg:pr-4">
          <div className="relative flex flex-col galaxy:flex-row flex-wrap gap-4 galaxy:gap-2 h-fit max-w-fit w-fit">
            <div className="text-white w-fit h-fit text-sm font-fira relative float-left col-start-1 row-start-1 break-word pr-1 galaxy:pr-0">
              Latent microfactory feed
            </div>
            <div className="relative h-fit w-fit self-start galaxy:self-center -top-2 col-start-2 row-start-1">
              <div className="absolute h-3 w-3 rounded-full opacity-75 animate-ping bg-green-100"></div>
              <div className="absolute rounded-full h-3 w-3 bg-green-500"></div>
            </div>
          </div>
          <div className="w-fit h-fit block relative pb-4 pt-2 flex flex-col">
            {randomMicrofactory && (
              <video
                className="relative w-3/4 galaxy:w-48 sm:w-60 h-fit min-h-fit object-cover"
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
        <div className="relative h-fit w-full lg:w-fit pl-10 pb-4 lg:pb-0 lg:pl-0 flex justify-self-end row-start-7 md:row-start-4 lg:row-start-3 col-start-1 md:pt-10 md:col-start-2 lg:col-start-3 self-start md:self-end pr-4 lg:pt-0">
          <div className="flex flex-row flex-wrap relative h-fit w-fit gap-3">
            <div className="relative w-fit h-fit col-start-1 place-self-end">
              <Link href={"https://mirror.xyz/f3manifesto.eth"}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-empireS h-fit relative pr-1"
                >
                  <Image
                    src={`https://f3manifesto.infura-ipfs.io/ipfs/QmVBiKdFNfb7p8TCiaiHFiof3Z3cWJ1SFAPackcKr3m5SU`}
                    width={21}
                    height={26}
                  />
                </a>
              </Link>
            </div>
            <div className="relative w-fit h-fit col-start-2 place-self-end">
              <Link href={"https://github.com/f3manifesto"}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-empireS h-fit relative pr-1"
                >
                  <Image
                    width={29}
                    height={28}
                    src={`https://f3manifesto.infura-ipfs.io/ipfs/QmTgYZMe5qgaFCBoSicsr6sdEJmfguqwPzQ2CEFLTXWvMA`}
                  />
                </a>
              </Link>
            </div>
            <div className="relative w-fit h-fit col-start-3">
              <Link href={"https://lenster.xyz/u/f3manifesto.lens"}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-empireS h-fit relative"
                >
                  <Image
                    src={`https://f3manifesto.infura-ipfs.io/ipfs/QmamuDJVJw4BoWUrnRdE4GVabsbUFsYPysqzQn3pfeTPL9`}
                    width={30}
                    height={30}
                  />
                </a>
              </Link>
            </div>
            <div className="relative w-fit h-fit col-start-4">
              <Link href={"https://twitter.com/f3manifesto"}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-empireS h-fit relative"
                >
                  <BsTwitter size={30} color={"#FCF894"} />
                </a>
              </Link>
            </div>
            <div className="relative w-fit h-fit col-start-5 place-self-center">
              <Link href={"https://youtube.com/@f3manifesto"}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-empireS h-fit relative"
                >
                  <Image
                    src={`https://f3manifesto.infura-ipfs.io/ipfs/QmVCdoxVzrTLwzht4L11VJp2Kove61EJobtoxzCzoEK6Go`}
                    width={30}
                    height={20}
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

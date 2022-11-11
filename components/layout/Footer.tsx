import Image from "next/legacy/image";
import { BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="bg-black w-full h-auto relative grid grid-flow-row auto-rows-[auto auto] text-white">
      <div className="relative w-full h-fit row-start-1 grid grid-flow-col auto-cols-[auto auto] px-10 py-10">
        <div className="relative w-fit h-full col-start-1 grid grid-flow-col auto-cols-[auto auto] gap-2">
          <div className="relative w-fit h-fit col-start-1 cursor-pointer">
            <Image src="/images/lens.png" width={35} height={35} />
          </div>
          <div className="relative w-fit h-fit col-start-2 cursor-pointer">
            <BsTwitter color="white" size={35} />
          </div>
          <div className="relative w-fit h-fit col-start-3 cursor-pointer">
            <Image src="/images/mirror.png" width={25} height={35} />
          </div>
          <div className="relative w-fit h-fit col-start-4 cursor-pointer">
            <Image src="/images/github.png" width={35} height={35} />
          </div>
        </div>
        <div className="relative w-full h-fit col-start-2 grid grid-flow-col auto-cols-[auto auto]">
          <div className="relative w-[30vw] h-fit text-left text-white font-animosaR place-self-end">
            Every print, look, and accessory is an opportunity to tell a unique
            story that is more than a message. Add your voice to the history of
            this world made through the trade of patterns, source material, and
            synth craft. We are no longer the passive products of the ad
            targeted platforms. Ads still run the internet, but with drop
            merchant storefronts we are on the edge of joining a new era where
            everything about who runs the internet is flipped on its head.
          </div>
        </div>
        <div className="relative w-full h-full col-start-3 grid grid-flow-row auto-rows-[auto auto] text-white font-awkward text-5xl">
          <div className="relative row-start-1 w-fit h-fit justify-self-end">
            <Image src="/images/logo.png" width={60} height={60} />
          </div>
          <div className="relative w-fit h-fit row-start-2 text-right justify-self-end leading-5">A DROP</div>
          <div className="relative w-fit h-fit row-start-3 text-right justify-self-end leading-5">MERCHANT</div>
          <div className="relative w-fit h-fit row-start-4 text-right justify-self-end leading-5">STOREFRONT</div>
        </div>
      </div>
      <div className="relative w-full h-full row-start-2 grid grid-flow-col auto-cols-[auto auto] pt-3">
        <div className="relative w-full h-full text-[11rem] leading-tight text-white font-libR whitespace-nowrap overflow-x-hidden">
          SUPPLY FOR ONE
        </div>
      </div>
    </div>
  );
};

export default Footer;

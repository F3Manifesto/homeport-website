import Image from "next/image";
import Link from "next/link";

const PinBoard = (): JSX.Element => {
  return (
    <div className="w-[23vw] xl:w-2/12 bg-gradient-to-r from-grad1 via-grad2 to-grad3 h-full absolute right-0 border-2 border-borderBlue col-start-2 overflow-x-hidden">
      <div className="relative text-lightYellow font-fira text-xs whitespace-nowrap">
        01000001 01001001 00100000 01100110 01101111 01110010{" "}
      </div>
      <div className="absolute bottom-0 text-lightYellow font-fira text-xs whitespace-nowrap rotate-180">
        01000001 01001001 00100000 01100110 01101111 01110010{" "}
      </div>
      <div className="relative w-full h-auto grid grid-cols-3 grid-flow-row top-8 justify-center">
        <div className="relative h-full w-full flex justify-center align-center cursor-empireS hover:rotate-12">
          <Link href="https://digitalax.xyz">
            <a target="_blank" rel="noreferrer" className="cursor-empireS">
              <Image width={50} height={50} src="/images/digi.png" />
            </a>
          </Link>
        </div>
        <div className="relative h-full w-full flex justify-center align-center cursor-empireS hover:rotate-12">
          <Link href="https://inarisynth.xyz">
            <a target="_blank" rel="noreferrer" className="cursor-empireS">
              <Image width={50} height={50} src="/images/inari.png" />
            </a>
          </Link>
        </div>
        <div className="relative h-full w-full flex justify-center align-center cursor-empireS hover:rotate-12">
          <Link href="https://diysynth.xyz">
            <a target="_blank" rel="noreferrer" className="cursor-empireS">
              <Image width={50} height={50} src="/images/diy.png" />
            </a>
          </Link>
        </div>
      </div>
      <div className="relative w-full max-h-fit grid auto-rows-[auto auto] grid-flow-row gap-6 justify-center top-12">
        <div className="relative w-fit h-fit row-start-1">
          <div className="relative grid auto-cols-[auto auto] grid-flow-col w-full h-fit">
            <div className="relative h-fit w-fit col-start-1">
              <div className="relative border border-offWhite text-darkP font-firaL w-fit h-fit p-1 text-xxs flex ml-4 mb-3">
                68 73 89
              </div>
              <div className="relative grid auto-cols-[auto auto] grid-flow-col w-full h-fit">
                <div className="relative top-1 h-fit w-fit font-fira text-darkP text-xs col-start-1 self-start mr-2">
                  01
                </div>
                <div className="relative h-fit w-fit font-fira text-darkP text-md col-start-2 self-center">
                  D.I.Y <br /> <b className="font-firaB">Brutalism</b>
                </div>
              </div>
            </div>
            <div className="relative col-start-2 w-fit h-fit hover:rotate-45 h-fit w-fit self-center pl-4">
              <Image src="/images/wheel.png" width={50} height={50} />
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit row-start-2">
          <div className="relative grid auto-cols-[auto auto] grid-flow-col w-full h-fit">
            <div className="relative col-start-1 w-fit h-fit hover:rotate-45 h-fit w-fit self-center pr-2">
              <Image src="/images/player.png" width={65} height={50} />
            </div>
            <div className="relative col-start-2 relative h-fit w-fit">
              <div className="relative border border-offWhite text-darkP font-firaL w-fit h-fit p-1 text-xxs flex mr-4 mb-3">
                100 105 103 105
              </div>
              <div className="relative grid auto-cols-[auto auto] grid-flow-col w-full h-fit">
                <div className="relative top-1 h-fit w-fit font-fira text-darkP text-xs col-start-1 self-start mr-2">
                  02
                </div>
                <div className="relative h-fit w-fit font-fira text-darkP text-md col-start-2 self-center">
                  Digicore
                  <br /> <b className="font-firaB">Patchwork</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-fit h-fit row-start-3">
          <div className="relative grid auto-cols-[auto auto] grid-flow-col w-full h-fit">
            <div className="relative h-fit w-fit col-start-1">
              <div className="relative border border-offWhite text-darkP font-firaL w-fit h-fit p-1 text-xxs flex ml-4 mb-3">
                118 105 110 116
              </div>
              <div className="relative grid auto-cols-[auto auto] grid-flow-col w-full h-fit">
                <div className="relative top-1 h-fit w-fit font-fira text-darkP text-xs col-start-1 self-start mr-2">
                  03
                </div>
                <div className="relative h-fit w-fit font-fira text-darkP text-md col-start-2 self-center">
                  Vintage <br /> <b className="font-firaB">Americana</b>
                </div>
              </div>
            </div>
            <div className="relative col-start-2 w-fit h-fit hover:rotate-45 h-fit w-fit self-center pl-4">
              <Image src="/images/flag.png" width={65} height={50} />
            </div>
          </div>
        </div>
        <div className="relative w-fit h-fit row-start-4">
          <div className="relative grid auto-cols-[auto auto] grid-flow-col w-full h-fit">
            <div className="relative col-start-1 w-fit h-fit hover:rotate-45 h-fit w-fit self-center pr-2">
              <Image src="/images/fox.png" width={75} height={60} />
            </div>
            <div className="relative col-start-2 relative h-fit w-fit">
              <div className="relative border border-offWhite text-darkP font-firaL w-fit h-fit p-1 text-xxs flex mr-4 mb-3 ml-6">
                119 101 98
              </div>
              <div className="relative grid auto-cols-[auto auto] grid-flow-col w-full h-fit">
                <div className="relative top-1 h-fit w-fit font-fira text-darkP text-xs col-start-1 self-start mr-2">
                  04
                </div>
                <div className="relative h-fit w-fit font-fira text-darkP text-md col-start-2 self-center">
                  Cottagecore
                  <br /> <b className="font-firaB">Web Kitsch</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 leading-snug w-fit h-fit p-1 text-xs font-firaL text-center inline-flex align-center justify-center">
        MICROFACTORY CO-OPs <br />
        <br />
        VIRTUAL, LATENT & IRL SPACE Chapter 0001 - NYC Edition
      </div>
    </div>
  );
};

export default PinBoard;

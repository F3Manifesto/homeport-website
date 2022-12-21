import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PinBoardM = (): JSX.Element => {
  const [blur, setBlur] = useState<boolean>(true);
  return (
    <div className="max-w-full w-full bg-gradient-to-r from-grad1 via-grad2 to-grad3 h-fit relative border-2 border-borderBlue overflow-hidden">
      <div className="relative grid auto-cols-auto grid-flow-row max-w-full w-full h-full pt-8 pb-8 justify-items-center">
        <div className="relative h-fit w-fit col-start-1 row-start-1">
          <div className="relative w-full h-auto grid grid-rows-3 grid-flow-row justify-start gap-4">
            <div className="relative h-full w-full flex justify-center align-center cursor-empireS hover:rotate-12">
              <Link href="https://digitalax.xyz">
                <a
                  target="_blank"
                  rel="noreferrer"
                  className={`cursor-empireS ${
                    blur && "animate-unblur blur-sm"
                  }`}
                >
                  <Image
                    width={50}
                    height={50}
                    src={`https://f3manifesto.infura-ipfs.io/ipfs/QmQVaJCzQ4uYUYKGAzHNy3rXpiygF1B2PSsYpvoWVspcKC`}
                    onLoadingComplete={() => setBlur(false)}
                  />
                </a>
              </Link>
            </div>
            <div className="relative h-full w-full flex justify-center align-center cursor-empireS hover:rotate-12">
              <Link href="https://thedial.xyz">
                <a
                  target="_blank"
                  rel="noreferrer"
                  className={`cursor-empireS ${
                    blur && "animate-unblur blur-sm"
                  }`}
                >
                  <Image
                    width={50}
                    height={50}
                    src={`https://f3manifesto.infura-ipfs.io/ipfs/QmSnQomokCSA6gmD3qoxqw1Nabqa6S1cCn99XocC9xQ7hJ`}
                    onLoadingComplete={() => setBlur(false)}
                  />
                </a>
              </Link>
            </div>
            <div className="relative h-full w-full flex justify-center align-center cursor-empireS hover:rotate-12">
              <Link href="https://diysynth.xyz">
                <a
                  target="_blank"
                  rel="noreferrer"
                  className={`cursor-empireS ${
                    blur && "animate-unblur blur-sm"
                  }`}
                >
                  <Image
                    width={50}
                    height={50}
                    src={`https://f3manifesto.infura-ipfs.io/ipfs/QmP1YcKZaxPu1PCGEgd5QSgbhyazMnG67oZSiLHBtG3HXc`}
                    onLoadingComplete={() => setBlur(false)}
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative h-fit w-full min-w-full row-start-1 row-span-4 pt-3 col-start-2">
          <div className="relative w-full max-h-fit grid auto-cols-auto grid-flow-col gap-2">
            <div className="relative w-fit h-fit col-start-1 row-start-1">
              <div className="relative h-fit w-full col-start-1">
                <div className="relative border border-offWhite text-darkP font-firaL w-fit h-fit p-1 text-xxs flex ml-4 mb-3">
                  68 73 89
                </div>
                <div className="relative grid auto-cols-auto grid-flow-col w-full h-fit">
                  <div className="relative top-1 h-fit w-fit font-fira text-darkP text-xs col-start-1 self-start mr-2">
                    01
                  </div>
                  <div className="relative h-fit w-full font-fira text-darkP text-md col-start-2 place-self-center self-center">
                    D.I.Y <br /> <b className="font-firaB">Brutalism</b>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`relative col-start-1 row-start-2 w-fit h-fit hover:rotate-45 h-fit w-fit self-center pl-3 ${
                blur && "blur-sm animate-unblur"
              }`}
            >
              <Image
                src={`https://f3manifesto.infura-ipfs.io/ipfs/QmWTJSNcEuYBqzu1FDFu2XzWtCwqgKcYbXNVNU6Jhvsx1H`}
                width={50}
                height={50}
                onLoadingComplete={() => setBlur(false)}
              />
            </div>
            <div className="relative col-start-2 row-start-1 w-fit h-fit hover:rotate-45 h-fit w-fit self-center pr-2">
              <Image
                src={`https://f3manifesto.infura-ipfs.io/ipfs/QmcK4e8wqP8p4YgQ5k3wMrFqwHTPL1Ex5vGQ1eHYNs6FLX`}
                width={65}
                height={50}
                onLoadingComplete={() => setBlur(false)}
              />
            </div>
            <div className="relative w-full h-fit col-start-2 row-start-2">
              <div className="relative grid auto-cols-auto grid-flow-col w-full h-fit">
                <div className="relative col-start-1 relative h-fit w-fit">
                  <div className="relative border border-offWhite text-darkP font-firaL w-fit h-fit p-1 text-xxs flex mr-4 mb-3">
                    100 105 103 105
                  </div>
                  <div className="relative grid auto-cols-auto grid-flow-col w-full h-fit">
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
            <div className="relative w-fit h-fit row-start-3 col-start-1 sm:col-start-3 sm:row-start-1">
              <div className="relative grid auto-cols-auto grid-flow-col w-full h-fit">
                <div className="relative h-fit w-fit col-start-1">
                  <div className="relative border border-offWhite text-darkP font-firaL w-fit h-fit p-1 text-xxs flex ml-4 mb-3">
                    118 105 110 116
                  </div>
                  <div className="relative grid auto-cols-auto grid-flow-col w-full h-fit">
                    <div className="relative top-1 h-fit w-fit font-fira text-darkP text-xs col-start-1 self-start mr-2">
                      03
                    </div>
                    <div className="relative h-fit w-fit font-fira text-darkP text-md col-start-2 self-center">
                      Vintage <br /> <b className="font-firaB">Americana</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`relative col-start-2 sm:col-start-3 row-start-3 sm:row-start-2 w-fit h-fit hover:rotate-45 h-fit w-fit self-center pl-4 ${
                blur && "blur-sm animate-unblur"
              }`}
            >
              <Image
                src={`https://f3manifesto.infura-ipfs.io/ipfs/QmZJLFCwTWpbxGwVNxR5MFHgkq54PRWXhpL3REN5DxAeML`}
                width={65}
                height={50}
                onLoadingComplete={() => setBlur(false)}
              />
            </div>
            <div
              className={`relative col-start-1 row-start-4 sm:col-start-4 sm:row-start-1 w-fit h-fit hover:rotate-45 h-fit w-fit self-center pr-2 ${
                blur && "blur-sm animate-unblur"
              }`}
            >
              <Image
                src={`https://f3manifesto.infura-ipfs.io/ipfs/QmdXPUuopyM2feMd275n2qLzD2qkY3ky44ct22tHFdqzQR`}
                width={75}
                height={60}
                onLoadingComplete={() => setBlur(false)}
              />
            </div>
            <div className="relative w-fit h-fit row-start-4 col-start-2 sm:col-start-4 sm:row-start-2">
              <div className="relative grid auto-cols-auto grid-flow-col w-full h-fit">
                <div className="relative col-start-2 relative h-fit w-fit">
                  <div className="relative border border-offWhite text-darkP font-firaL w-fit h-fit p-1 text-xxs flex mr-4 mb-3 ml-6">
                    119 101 98
                  </div>
                  <div className="relative grid auto-cols-auto grid-flow-col w-full h-fit">
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
            <div className="relative w-fit h-fit row-start-5 col-start-1 sm:col-start-5 sm:row-start-1">
              <div className="relative grid auto-cols-auto grid-flow-col w-full h-fit">
                <div className="relative h-fit w-fit col-start-1">
                  <div className="relative border border-offWhite text-darkP font-firaL w-fit h-fit p-1 text-xxs flex ml-4 mb-3">
                    108 111 102 105
                  </div>
                  <div className="relative grid auto-cols-auto grid-flow-col w-full h-fit">
                    <div className="relative top-1 h-fit w-fit font-fira text-darkP text-xs col-start-1 self-start mr-2">
                      05
                    </div>
                    <div className="relative h-fit w-fit font-fira text-darkP text-md col-start-2 self-center">
                      LoFi <br /> <b className="font-firaB">Tech Wear</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`relative col-start-2 sm:col-start-5 row-start-5 sm:row-start-2 w-fit h-fit hover:rotate-45 h-fit w-fit self-center pl-4 ${
                blur && "blur-sm animate-unblur"
              }`}
            >
              <Image
                src={`https://f3manifesto.infura-ipfs.io/ipfs/QmSu8HaEDZAy1CXAPoogGrmdtBkps8Rjk3bwcDEr9No6HP`}
                width={70}
                height={70}
                onLoadingComplete={() => setBlur(false)}
              />
            </div>
          </div>
        </div>
        {/* <div className="relative h-fit w-full row-start-3 pb-2 pr-3 pl-3">
          <div className="relative leading-snug w-fit h-fit p-1 text-xs font-firaL text-center inline-flex align-center justify-center bottom-0">
            MICROFACTORY CO-OPs <br />
            <br />
            VIRTUAL, LATENT & IRL SPACE Chapter 0001 - NYC Edition
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PinBoardM;

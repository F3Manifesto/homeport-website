import Image from "next/image";
import { FunctionComponent, useState } from "react";
import { PinBoardProps } from "../../../types/general.types";
import { INFURA_GATEWAY } from "../../../lib/constants";

const PinBoard: FunctionComponent<PinBoardProps> = ({
  goShopping,
  filterURL,
  filterConstants,
}): JSX.Element => {
  const [blur, setBlur] = useState<boolean>(true);
  return (
    <div className="w-full bg-gradient-to-r from-grad1 via-grad2 to-grad3 h-auto relative border-2 border-borderBlue">
      <div className="relative flex flex-col equ:flex-row xl:flex-col w-full h-full gap-6 xl:gap-14 xl:pt-8 items-center">
        <div className="relative w-full equ:w-fit xl:w-full h-full xl:py-0 py-[4vw] xl:h-fit flex flex-row equ:flex-col xl:flex-row gap-6 justify-between px-6 wide:px-[3vw] items-center">
          <a
            href="https://digitalax.xyz"
            target="_blank"
            rel="noreferrer"
            className={`relative h-fit w-fit cursor-empireS hover:rotate-12 justify-center rounded-full grid grid-flow-col auto-cols-auto ${
              blur && "blur-sm animate-unblur"
            }`}
          >
            <Image
              width={50}
              height={50}
              src={`${INFURA_GATEWAY}/ipfs/QmQVaJCzQ4uYUYKGAzHNy3rXpiygF1B2PSsYpvoWVspcKC`}
              onLoadingComplete={() => setBlur(false)}
              className="w-full h-full place-self-center rounded-full"
              draggable={false}
            />
          </a>
          <a
            href="https://chromadin.xyz"
            target="_blank"
            rel="noreferrer"
            className={`relative h-fit w-fit cursor-empireS hover:rotate-12 rounded-full border border-black justify-center grid grid-flow-col auto-cols-auto ${
              blur && "blur-sm animate-unblur"
            }`}
          >
            <Image
              width={50}
              height={50}
              src={`${INFURA_GATEWAY}/ipfs/QmXM6QSYCbMJ5eXJHuGqMTbCTkaDqth5c4NswX2nWTpenB`}
              onLoadingComplete={() => setBlur(false)}
              className="w-full h-full place-self-center rounded-full"
              draggable={false}
            />
          </a>
          <a
            href="https://cypher.digitalax.xyz"
            target="_blank"
            rel="noreferrer"
            className={`border border-black relative h-fit w-fit cursor-empireS rounded-full hover:rotate-12 justify-center grid grid-flow-col auto-cols-auto ${
              blur && "blur-sm animate-unblur"
            }`}
          >
            <Image
              width={50}
              height={50}
              src={`${INFURA_GATEWAY}/ipfs/QmYRZYGFKgH6wGJ39aWHbr7T1PsySh2kTSjo11yEZrrGcM`}
              onLoadingComplete={() => setBlur(false)}
              className="w-full h-full place-self-center rounded-full"
              draggable={false}
            />
          </a>
        </div>
        <div className="relative w-fit xl:w-full h-full flex flex-wrap md:flex-nowrap flex-row xl:flex-col gap-8 items-center px-3 justify-center">
          <div className="relative flex flex-col xl:flex-row w-fit h-fit gap-3 items-center">
            <div className="relative h-fit w-fit">
              <div className="relative border border-offWhite text-darkP font-firaL w-fit h-fit p-1 text-xxs flex ml-4 mb-3 whitespace-nowrap break-word">
                68 73 89
              </div>
              <div className="relative grid auto-cols-auto grid-flow-col w-full h-fit">
                <div className="relative top-1 h-fit w-fit font-fira text-darkP text-xs col-start-1 self-start mr-2">
                  01
                </div>
                <div className="relative h-fit w-full font-fira text-darkP text-md col-start-2 self-center">
                  D.I.Y <br /> <b className="font-firaB">Brutalism</b>
                </div>
              </div>
            </div>
            <div
              className={`relative w-fit hover:rotate-45 h-fit grid grid-flow-cols auto-cols-auto cursor-empireS ${
                blur && "blur-sm animate-unblur"
              }`}
              onClick={() => {
                goShopping();
                filterURL("style", filterConstants?.styles?.[2]);
              }}
            >
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmWTJSNcEuYBqzu1FDFu2XzWtCwqgKcYbXNVNU6Jhvsx1H`}
                width={50}
                height={50}
                onLoadingComplete={() => setBlur(false)}
                className="flex place-self-center w-fit h-fit"
                draggable={false}
              />
            </div>
          </div>
          <div className="relative flex flex-col xl:flex-row w-fit h-fit gap-3 items-center">
            <div
              className={`relative w-fit hover:rotate-45 h-fit grid grid-flow-cols auto-cols-auto cursor-empireS ${
                blur && "blur-sm animate-unblur"
              }`}
              onClick={() => {
                goShopping();
                filterURL("style", filterConstants?.styles?.[1]);
              }}
            >
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmcK4e8wqP8p4YgQ5k3wMrFqwHTPL1Ex5vGQ1eHYNs6FLX`}
                width={65}
                height={50}
                draggable={false}
                onLoadingComplete={() => setBlur(false)}
                className="flex place-self-center w-fit h-fit"
              />
            </div>
            <div className="relative relative h-fit w-fit">
              <div className="relative border border-offWhite text-darkP font-firaL w-fit h-fit p-1 text-xxs flex mr-4 mb-3 whitespace-nowrap break-word">
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
          <div className="relative flex flex-col xl:flex-row w-fit h-fit gap-3 items-center">
            <div className="relative h-fit w-fit">
              <div className="relative border border-offWhite text-darkP font-firaL w-fit h-fit p-1 text-xxs flex ml-4 mb-3 whitespace-nowrap break-word">
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
            <div
              className={`relative w-fit hover:rotate-45 h-fit grid grid-flow-cols auto-cols-auto cursor-empireS ${
                blur && "blur-sm animate-unblur"
              }`}
              onClick={() => {
                goShopping();
                filterURL("style", filterConstants?.styles?.[0]);
              }}
            >
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmZJLFCwTWpbxGwVNxR5MFHgkq54PRWXhpL3REN5DxAeML`}
                width={65}
                draggable={false}
                height={50}
                onLoadingComplete={() => setBlur(false)}
                className="flex place-self-center w-fit h-fit"
              />
            </div>
          </div>
          <div className="relative flex flex-col xl:flex-row w-fit h-fit gap-3 items-center">
            <div
              className={`relative w-fit hover:rotate-45 h-fit grid grid-flow-cols auto-cols-auto cursor-empireS ${
                blur && "blur-sm animate-unblur"
              }`}
              onClick={() => {
                goShopping();
                filterURL("style", filterConstants?.styles?.[4]);
              }}
            >
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmdXPUuopyM2feMd275n2qLzD2qkY3ky44ct22tHFdqzQR`}
                width={75}
                height={60}
                draggable={false}
                onLoadingComplete={() => setBlur(false)}
                className="flex place-self-center w-fit h-fit"
              />
            </div>
            <div className="relative relative h-fit w-fit">
              <div className="relative border border-offWhite text-darkP font-firaL w-fit h-fit p-1 text-xxs flex mr-4 mb-3 ml-6 whitespace-nowrap break-word">
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
          <div className="relative flex flex-col xl:flex-row w-fit h-fit gap-3 items-center">
            <div className="relative h-fit w-fit">
              <div className="relative border border-offWhite text-darkP font-firaL w-fit h-fit p-1 text-xxs flex ml-4 mb-3 whitespace-nowrap break-word">
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
            <div
              className={`relative w-fit hover:rotate-45 h-fit grid grid-flow-cols auto-cols-auto cursor-empireS ${
                blur && "blur-sm animate-unblur"
              }`}
              onClick={() => {
                goShopping();
                filterURL("style", filterConstants?.styles?.[3]);
              }}
            >
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmSu8HaEDZAy1CXAPoogGrmdtBkps8Rjk3bwcDEr9No6HP`}
                width={70}
                height={70}
                onLoadingComplete={() => setBlur(false)}
                className="flex place-self-center w-fit h-fit"
                draggable={false}
              />
            </div>
          </div>
        </div>
        <div className="relative h-full w-fit xl:w-full pb-2 pr-3 pl-3 grid grid-flow-col auto-cols-auto">
          <div className="relative leading-snug w-fit h-fit p-1 text-xs font-firaL text-center place-self-center bottom-0 col-start-1 break-word">
            MICROFACTORY CO-OPs <br />
            <br />
            VIRTUAL, LATENT & IRL SPACE Chapter 0001 - NYC Edition
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinBoard;

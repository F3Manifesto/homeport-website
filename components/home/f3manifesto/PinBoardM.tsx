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
                    src={`https://bafybeiclh42efupubyev4vrbvivxqxaijpklj4sq5v4ijtyhjdpetqvrbu.ipfs.w3s.link/digi.png`}
                    placeholder="blur"
                    blurDataURL={`https://bafybeifjaq2f6hektobf4yhyco5mao4ql7zbbnrdov3zrc7uli2qfvjhim.ipfs.w3s.link/digi.png`}
                    onLoadingComplete={() => setBlur(false)}
                  />
                </a>
              </Link>
            </div>
            <div className="relative h-full w-full flex justify-center align-center cursor-empireS hover:rotate-12">
              <Link href="https://inarisynth.xyz">
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
                    src={`https://bafybeicjx5t2m6mkdyw6pq44svyehj5zf7akcujosusz4dafmfoyqo5kyi.ipfs.w3s.link/inari.png`}
                    placeholder="blur"
                    blurDataURL={`https://bafybeigwle5f5up3mtj7wos5fghphzyuuvitg2rlcmc7jsoqgcp3m6xs3m.ipfs.w3s.link/inari.png`}
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
                    src={`https://bafybeigym3q7opulubjzjnv63ry7pqu5cc7nmhp3dhhwwozlitp2ctrx5q.ipfs.w3s.link/diy.png`}
                    placeholder="blur"
                    blurDataURL={`https://bafybeie5qbssfuiwjxiueekd22sxwr3nqzch4fp7762lzf55msfxxuqtzu.ipfs.w3s.link/diy.png`}
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
                src={`https://bafybeiga3k7vrdjukoyalvpiu7hyjlozxrqoh367wk2oaioo465aqs4yoi.ipfs.w3s.link/wheel.png`}
                width={50}
                height={50}
                placeholder="blur"
                blurDataURL={`https://bafybeihehwvyymhspkpv5bxfixkpfeazxibpw6nhfjefezapfdzlb7m6ie.ipfs.w3s.link/wheel.png`}
                onLoadingComplete={() => setBlur(false)}
              />
            </div>
            <div className="relative col-start-2 row-start-1 w-fit h-fit hover:rotate-45 h-fit w-fit self-center pr-2">
              <Image
                src={`https://bafybeie3y242lveoh5btglzom3sonrynp5o2v5usr3docrcdw7watxpntm.ipfs.w3s.link/player.png`}
                width={65}
                height={50}
                placeholder="blur"
                blurDataURL={`https://bafybeidyxz2oglpcdeidcwbzghs7kzbgsxdbhvfc6wg4l3ha6os5y5dofu.ipfs.w3s.link/player.png`}
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
                src={`https://bafybeiafghblmzeheouptjjq5hdfjqbspf2bzcyssfmg3ih663mmb4dfqe.ipfs.w3s.link/flag.png`}
                width={65}
                height={50}
                placeholder="blur"
                blurDataURL={`https://bafybeig76kzuz4evtkzogq3d7uaxpcr73dmwmuzuj3tbhxyvzlzfal7e3a.ipfs.w3s.link/flag.png`}
                onLoadingComplete={() => setBlur(false)}
              />
            </div>
            <div
              className={`relative col-start-1 row-start-4 sm:col-start-4 sm:row-start-1 w-fit h-fit hover:rotate-45 h-fit w-fit self-center pr-2 ${
                blur && "blur-sm animate-unblur"
              }`}
            >
              <Image
                src={`https://bafybeibwmr35dlv7vxufvtmbtlbp5ymltf3eb5bzlh63hgr3brpqkkv254.ipfs.w3s.link/fox.png`}
                width={75}
                height={60}
                placeholder="blur"
                blurDataURL={`https://bafybeichll3avg422wwdzctxxkj3erjui27a5oo24v4dirwrmpc6ibcrsy.ipfs.w3s.link/fox.png`}
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

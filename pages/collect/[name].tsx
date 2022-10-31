import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Gallery } from "../../types/general.types";
import tokens from "./../api/tokens.json";
import { AiFillBackward } from "react-icons/ai";
import Sidebar from "../../components/layout/Sidebar";

export const getStaticPaths = async () => {
  const paths = tokens.map((token: Gallery) => {
    return {
      params: {
        name: token.name,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const name: string = context.params.name;
  const response = tokens.filter((token: Gallery) => token.name === name);
  return {
    props: { token: response },
  };
};

const TokenDetails = ({ token }: any): JSX.Element => {
  console.log(token);
  return (
    <div className="flex min-h-screen h-fit min-w-screen relative cursor-empire selection:bg-lightYellow selection:text-lightYellow cursor-empireA bg-gradient-to-b from-lightYellow via-white to-lightPurple">
      <Sidebar />
      <div className="grid grid-flow-row auto-rows-[auto auto] w-full h-full">
        <Link href={"/#shopping"} className="relative row-start-1 w-fit h-fit">
          <div className="text-offBlack font-fira left-7 self-center pt-8 pl-6 place-self-start h-fit w-fit top-7 opacity-80 hover:opacity-20 cursor-empireS row-start-1 pb-28">
            <AiFillBackward
              color="#131313"
              size={25}
              className="float-left mr-2"
            />{" "}
            Return
          </div>
        </Link>
        <div className="relative w-full h-fit row-start-2 border-t-4 border-lightWhite grid grid-flow-col auto-cols-[auto auto]">
          <div className="relative col-start-1 place-self-start pl-14 pt-8 pb-4 font-jacklane text-4xl sm:text-7xl place-self-start">
            {token[0].name.toUpperCase()}
          </div>
        </div>
        <div className="relative w-full row-start-3 h-fit bg-foot grid grid-flow-col auto-cols-[auto auto] pt-8 pb-8 border-b-8 border-t-8 border-lightWhite">
          <div className="relative w-full h-[50vw] col-start-1 place-self-center">
            <Image
              priority
              layout="fill"
              objectFit="contain"
              unoptimized
              blurDataURL={token[0].blurred}
              placeholder="blur"
              loader={() => token[0].image}
              src={token[0].image}
            />
          </div>
        </div>
        <div className="relative w-full h-full row-start-4 grid grid-flow-col auto-cols-[auto auto] pt-10 pb-24">
          <div className="relative w-[95%] h-fit col-start-1 border-offBlack border-4 place-self-center grid grid-flow-col auto-col-[auto auto] bg-lightYellow">
            <div className="relative w-fit h-fit col-start-1 grid grid-flow-row auto-rows-[auto auto] gap-10 p-8 border-r-2 border-offBlack">
              <div className="relative w-fit h-fit grid grid-flow-col auto-cols-[auto auto] gap-10 row-start-1">
                <div className="relative w-fit h-fit col-start-1 grid grid-flow-row auto-rows-[auto auto]">
                  <div className="relative w-fit h-fit row-start-1 font-firaL text-5xl text-black">
                    0.32Ξ
                  </div>
                  <div className="relative w-fit h-fit row-start-2 text-offBlack/75 text-base font-firaM place-self-end pt-2">
                    ($420.22)
                  </div>
                </div>
                <div className="relative w-fit h-fit col-start-2 grid grid-flow-row auto-rows-[auto auto] gap-2">
                  <div className="relative w-fit h-fit row-start-1 font-firaL text-5xl text-black grid grid-flow-col auto-cols-[auto auto] border-2 border-black grid grid-flow-col auto-cols-[auto auto] p-1">
                    <div className="col-start-1 relative w-fit h-fit hover:opacity-70 text-base font-fira place-self-center pr-2">
                      COLLECT{" "}
                    </div>
                    <div className="col-start-2 w-4 h-4 relative w-fit h-fit place-self-center">
                      <Image
                        src="/images/expand2.png"
                        layout="fill"
                        alt="Expand"
                        priority
                      />
                    </div>
                  </div>
                  <div className="relative w-fit h-fit row-start-2 text-offBlack/75 text-base font-firaM place-self-end pt-2 grid grid-flow-row auto-rows-[auto auto] gap-2">
                    <div className="relative w-fit h-fit row-start-1 grid grid-flow-col auto-cols-[auto auto] gap-2">
                      <div className="relative w-4 h-4 rounded-full col-start-1 border-2 border-black bg-brightGreen place-self-center"></div>
                      <div className="relative w-fit h-fit rounded-full col-start-2 text-offBlack font-fira place-self-center">
                        metadata
                      </div>
                    </div>
                    <div className="relative w-fit h-fit row-start-2 grid grid-flow-col auto-cols-[auto auto] gap-2 opacity-20">
                      <div className="relative w-4 h-4 rounded-full col-start-1 border-2 border-black bg-foot place-self-center"></div>
                      <div className="relative w-fit h-fit rounded-full col-start-2 text-offBlack font-fira place-self-center">
                        stream
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative w-fit h-fit row-start-2 grid grid-flow-row auto-rows-[auto auto] font-firaM gap-2">
                <div className="relative w-fit h-fit row-start-1 grid grid-flow-col auto-cols-[auto auto] gap-1">
                  <div className="relative w-4 h-6 col-start-1">
                    <Image
                      src="/images/greenarrows.png"
                      layout="fill"
                      alt="Arrow"
                      priority
                    />
                  </div>
                  <div className="relative w-fit h-fit pl-3 pr-3 pt-0.5 pb-0.5 border-2 border-black rounded-lg col-start-2 text-bronze">
                    {token[0].amount}
                  </div>
                </div>
                <div className="relative w-fit h-fit row-start-2 grid grid-flow-col auto-cols-[auto auto] gap-1">
                  <div className="relative w-4 h-6 col-start-1">
                    <Image
                      src="/images/greenarrows.png"
                      layout="fill"
                      alt="Arrow"
                      priority
                    />
                  </div>
                  <div className="relative w-fit h-fit pl-3 pr-3 pt-0.5 pb-0.5 border-2 border-black rounded-lg col-start-2 text-midBlue">
                    {token[0].amount + " Edition"}
                  </div>
                </div>
                <div className="relative w-fit h-fit row-start-3 grid grid-flow-col auto-cols-[auto auto] gap-1">
                  <div className="relative w-4 h-6 col-start-1">
                    <Image
                      src="/images/greenarrows.png"
                      layout="fill"
                      alt="Arrow"
                      priority
                    />
                  </div>
                  <div className="relative w-fit h-fit pl-3 pr-3 pt-0.5 pb-0.5 border-2 border-black rounded-lg col-start-2">
                    {token[0].collection}
                  </div>
                </div>
              </div>
              <div className="relative w-full h-fit row-start-3 grid grid-flow-row auto-rows-[auto auto]">
                <div className="relative w-fit h-fit row-start-1 text-offBlack text-lg font-firaB">
                  STYLE
                </div>
                <div className="relative w-full h-1 row-start-2 bg-offBlack"></div>
                <div className="relative w-fit h-fit row-start-3 grid grid-flow-col auto-cols-[auto auto] pt-3 gap-2">
                  <div className="relative col-start-1 w-fit h-fit">
                    <div className="relative h-10 w-16 border-r-4 border-t-2 border-b-2 border-l-2 border-offBlack rounded-md bg-foot place-self-center">
                      <Image
                        src="/images/fox.png"
                        objectFit="fill"
                        layout="fill"
                        alt="Profile Image"
                        priority
                      />
                    </div>
                  </div>
                  <div className="relative col-start-2 w-fit h-fit text-offBlack text-base font-fira place-self-center">
                    {token[0].style}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full h-fit col-start-2 grid grid-flow-row auto-rows-[auto auto] p-6">
              <div className="row-start-1 relative w-full h-fit text-offBlack font-firaM text-base text-right pb-16 place-self-end">
                {token[0].description}
              </div>
              <div className="relative w-full h-0.5 bg-offBlack row-start-2  place-self-end"></div>
              <div className="relative w-fit h-fit row-start-3 text-offBlack font-firaB text-lg pt-16 pb-3 place-self-end">
                SYNTH GRAPH
              </div>
              <div className="relative w-full h-fit row-start-4 text-offBlack font-firaL text-sm text-right place-self-end">
                {token[0].graph}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDetails;

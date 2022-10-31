import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useRef } from "react";
import { Gallery } from "../../types/general.types";
import tokens from "./../api/tokens.json";
import { AiFillBackward } from "react-icons/ai";
import Metadata from "../../components/collect/Metadata";
import Connect from "../../components/common/connect/Connect";
import { GlobalContext } from "../_app";

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
  const connect = useRef<null | HTMLDivElement>(null);
  const { setContract } = useContext(GlobalContext);
  useEffect(() => {
    setContract("0x01c8d806382d49b536f24aee8f529706ede70845");
  }, []);
  return (
    <div className="flex min-h-screen h-fit min-w-screen relative cursor-empire selection:bg-lightYellow selection:text-lightYellow cursor-empireA bg-gradient-to-b from-lightY via-white to-lightPurple">
      <div className="grid grid-flow-row auto-rows-[auto auto] w-full h-full">
        <div className="relative row-start-1 w-full h-fit grid grid-flow-col auto-cols-[auto auto]">
          <Link
            href={"/#shopping"}
            className="relative col-start-1 w-fit h-fit"
          >
            <div className="text-offBlack font-fira left-7 self-center pt-8 pl-6 place-self-start h-fit w-fit top-7 opacity-80 hover:opacity-20 cursor-empireS row-start-1 pb-28">
              <AiFillBackward
                color="#131313"
                size={25}
                className="float-left mr-2"
              />{" "}
              Return
            </div>
          </Link>
          <div
            className="col-start-2 w-fit h-fit hover:text-offBlue underline underline-offset-4 cursor-pointer h-fit pt-8 pr-6 z-10 justify-self-end"
            ref={connect}
          >
            <Connect />
          </div>
        </div>
        <div className="relative w-full h-fit row-start-2 border-t-4 border-lightWhite grid grid-flow-col auto-cols-[auto auto]">
          <div className="relative col-start-1 place-self-start pl-4 sm:pr-0 pr-4 sm:pl-14 pt-8 pb-4 font-jacklane text-4xl sm:text-7xl place-self-start">
            {token[0].name.toUpperCase()}
          </div>
        </div>
        <div className="relative w-full row-start-3 h-fit bg-foot grid grid-flow-col auto-cols-[auto auto] pt-8 pb-8 border-b-8 border-t-8 border-lightWhite">
          <div className="relative w-full h-[120vw] sm:h-[70vw] md:h-[50vw] col-start-1 place-self-center">
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
        <Metadata token={token} connect={connect} />
      </div>
    </div>
  );
};

export default TokenDetails;

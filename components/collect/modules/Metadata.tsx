import Image from "next/image";
import { FunctionComponent } from "react";
import { MetadataProps } from "../../../types/general.types";
import { INFURA_GATEWAY } from "../../../lib/constants";

const Metadata: FunctionComponent<MetadataProps> = ({ item, collect, setCollect }): JSX.Element => {
  return (
    <div className="relative w-full h-full flex border-offBlack border-4 flex-row items-center justify-center bg-lightY">
      <div className="relative w-full lg:w-fit h-full flex flex-col gap-3 p-4 lg:border-r-2 border-offBlack items-start justify-start">
        <div className="relative w-full sm:w-fit h-fit flex items-start justify-start">
          <div className="relative w-fit h-fit flex font-firaL text-5xl text-black">
            ${Number(item?.prices?.[0]) / 10 ** 18}
          </div>
        </div>
        <div className="relative w-fit h-fit pb-8 galaxy:pb-0 flex flex-col font-firaM gap-2">
          <div className="relative w-fit h-fit flex gap-1">
            <div className="relative w-4 h-6 col-start-1">
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmaercaFRN5CogxWiB5TVdDMG42XY2Uf7MD5zHfQgJKEWQ`}
                layout="fill"
                alt="Arrow"
                priority
                draggable={false}
              />
            </div>
            <div className="relative w-fit h-fit pl-3 pr-3 pt-0.5 pb-0.5 border-2 border-black rounded-lg col-start-2 text-bronze hover:bg-lightPurple cursor-empireS">
              {Number(item?.amount) == Number(item?.soldTokens)
                ? "SOLD OUT"
                : Number(item?.soldTokens) > 0
                ? `${Number(item?.soldTokens)} / ${Number(item?.amount)}`
                : `${Number(item?.amount)} / ${Number(item?.amount)}`}
            </div>
          </div>
          <div className="relative w-fit h-fit row-start-2 grid grid-flow-col auto-cols-auto gap-1">
            <div className="relative w-4 h-6 col-start-1">
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmaercaFRN5CogxWiB5TVdDMG42XY2Uf7MD5zHfQgJKEWQ`}
                layout="fill"
                alt="Arrow"
                priority
                draggable={false}
              />
            </div>
            <div className="relative w-fit h-fit pl-3 pr-3 pt-0.5 pb-0.5 border-2 border-black rounded-lg col-start-2 hover:bg-lightPurple cursor-empireS">
              {item?.collectionMetadata?.sex}
            </div>
          </div>
          <div className="relative w-fit h-fit row-start-3 grid grid-flow-col auto-cols-auto gap-1">
            <div className="relative w-4 h-6 col-start-1">
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmaercaFRN5CogxWiB5TVdDMG42XY2Uf7MD5zHfQgJKEWQ`}
                layout="fill"
                alt="Arrow"
                priority
                draggable={false}
              />
            </div>
            <div className="relative w-fit h-fit pl-3 pr-3 pt-0.5 pb-0.5 border-2 border-black rounded-lg col-start-2 hover:bg-lightPurple cursor-empireS">
              {item?.dropMetadata?.dropTitle}
            </div>
          </div>
          <div className="relative w-fit h-fit row-start-4 grid grid-flow-col auto-cols-auto gap-1">
            <div className="relative w-4 h-6 col-start-1">
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmaercaFRN5CogxWiB5TVdDMG42XY2Uf7MD5zHfQgJKEWQ`}
                layout="fill"
                alt="Arrow"
                priority
                draggable={false}
              />
            </div>
            <div className="relative w-fit h-fit pl-3 pr-3 pt-0.5 pb-0.5 border-2 border-black text-pinkish rounded-lg col-start-2 hover:bg-lightPurple cursor-empireS">
              ERC 721
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit row-start-3 grid grid-flow-row auto-rows-auto">
          <div className="relative w-fit h-fit row-start-1 text-offBlack text-lg font-firaB">
            STYLE
          </div>
          <div className="relative w-full h-1 row-start-2 bg-offBlack"></div>
          <div className="relative w-fit h-fit row-start-3 grid grid-flow-col auto-cols-auto pt-3 gap-2">
            <div className="relative col-start-1 w-fit h-fit">
              <div className="relative h-10 w-16 border-r-4 border-t-2 border-b-2 border-l-2 border-offBlack rounded-md bg-lightWhite place-self-center grid grid-flow-col auto-cols-auto hover:rotate-6 cursor-empireS hover:mix-blend-exclusion">
                <div className="relative h-6 w-10 col-start-1 place-self-center">
                  <Image
                    src={`${INFURA_GATEWAY}/ipfs/${item?.collectionMetadata?.style}`}
                    objectFit="contain"
                    layout="fill"
                    alt="Profile Image"
                    priority
                    draggable={false}
                  />
                </div>
              </div>
            </div>
            <div className="relative col-start-2 w-fit h-fit text-offBlack text-base font-fira place-self-center">
              {item?.collectionMetadata?.style}
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full h-fit flex flex-col p-4 items-end justify-start">
        <div className="flex relative w-full h-fit text-offBlack font-firaM text-base text-right pb-16 justify-end items-end">
          {item?.collectionMetadata?.description}
        </div>
        <div className="relative w-full h-0.5 bg-offBlack justify-end flex"></div>
        <div className="relative w-fit h-fit flex text-offBlack font-firaB text-lg pt-16 pb-3 justify-end items-end">
          SYNTH GRAPH
        </div>
        <div className="relative w-full h-fit text-offBlack font-firaL text-sm text-right flex items-end justify-end">
          {item?.collectionMetadata?.prompt}
        </div>
      </div>
    </div>
  );
};

export default Metadata;

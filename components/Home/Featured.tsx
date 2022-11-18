import Image from "next/legacy/image";
import { FunctionComponent, useEffect } from "react";
import useFeatured from "./hooks/useFeatured";

const Featured: FunctionComponent = (): JSX.Element => {
  const { dropType, dropFormat, formatColors, typeColors } = useFeatured();
  return (
    <div className="relative w-full h-full row-start-1 grid grid-flow-col auto-cols-[auto auto]">
      <div className="relative w-fit h-full col-start-1 grid grid-flow-col auto-cols-[auto auto] place-self-center gap-36">
        <div className="relative w-[30vw] h-fit self-start col-start-1 grid grid-flow-row auto-rows-[auto auto] place-self-center gap-2">
          <div className="relative w-fit text-sm h-fit row-start-1 text-left text-white font-libB">
            For the creative collector on the edge of joining a new merchant
            society. The makings of an infinite record store, persistent in its
            source materials, where by our records we decentralize access to
            every memory worth sharing.
            <br />
            <br />
            It isn’t a couple of machines, or a few dozen. This omnicoastal
            periphery, with each GPU added gains storefronts independent of
            default states, enhanced by on-demand pricing feeds from oracles
            anyone can trust + verify.
          </div>
          <div className="relative w-fit h-fit row-start-2 pt-16 font-animosaR text-white pb-6">
            DROP TYPE
          </div>
          <div className="relative w-fit h-full row-start-3 font-animosaR gap-1 grid grid-flow-row auto-rows-[auto auto]">
            {dropType?.map((drop: string, index: number) => {
              return (
                <div
                  key={index}
                  className={`relative w-fit h-fit row-start-${
                    index + 1
                  } col-start-1 ${
                    index % 2 == 0 && index % 4 !== 0 && "text-yellowTheme"
                  } ${index % 2 == 0 && index % 4 === 0 && "text-blueTheme"} ${
                    index % 3 == 0 && index % 6 !== 0 && "text-purpleTheme"
                  } ${
                    index % 3 == 0 && index % 6 === 0 && "text-orangeTheme"
                  } ${index === dropType?.length - 1 && "py-10"}`}
                >
                  {drop}
                </div>
              );
            })}
          </div>
          <div className="relative w-fit h-fit row-start-4 font-animosaR text-white pb-6 pt-6">
            DROP FORMAT
          </div>
          <div className="relative w-fit h-full row-start-5 font-animosaR gap-1 grid grid-flow-row auto-rows-[auto auto]">
            {dropFormat?.map((drop: string, index: number) => {
              return (
                <div
                  key={index}
                  className={`relative w-fit h-fit row-start-${
                    index + 1
                  } col-start-1 ${
                    index % 2 == 0 && index % 4 !== 0 && "text-purpleTheme"
                  } ${
                    index % 2 == 0 && index % 4 === 0 && "text-orangeTheme"
                  } ${index % 3 == 0 && index % 6 !== 0 && "text-blueTheme"} ${
                    index % 3 == 0 && index % 6 === 0 && "text-yellowTheme"
                  } `}
                >
                  {drop}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="relative w-full h-full col-start-2 grid grid-flow-col auto-cols-[auto auto]">
        <div className="relative w-[40vw] h-[78vw] bg-grayBlue rounded-lg justify-self-center">
          <Image
            layout="fill"
            objectFit="cover"
            src="/images/main.png"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Featured;

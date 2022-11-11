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
            A BUNCH OF TEXT GOES HERE TO DESCRIBE THE GIST OF THE SITE ITS FEEL,
            ETC… Made to reflect on the persistence of source materials. In the
            aftermath of trades won and fortunes lost. The perpetual hunt for
            resources beyond the small games of highrise hopes.
            <br />
            <br />A new kind of market player emerges in the balance of
            technical self sovereignty and coherence of the craft. Availability
            limited to those who remember, not your keys means to seize your
            repeat of the GFC.
          </div>
          <div className="relative w-fit h-fit row-start-2 pt-16 font-animosaR text-white pb-6">
            DROP TYPE
          </div>
          <div className="relative w-fit h-full row-start-3 font-animosaR gap-1 grid grid-flow-row auto-rows-[auto auto]">
            {dropType.map((drop: string, index: number) => {
              return (
                <div
                  key={index}
                  className={`relative w-fit h-fit row-start-${
                    index + 1
                  } col-start-1 text-[${typeColors[index]}] ${index === dropType.length - 1 && "py-10"}`}
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
            {dropFormat.map((drop: string, index: number) => {
              return (
                <div
                  key={index}
                  className={`relative w-fit h-fit row-start-${
                    index + 1
                  } col-start-1 text-[${formatColors[index]}]`}
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
          <Image layout="fill" objectFit="cover" src="/images/main.png" priority />
        </div>
      </div>
    </div>
  );
};

export default Featured;

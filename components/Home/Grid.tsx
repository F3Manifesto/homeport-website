import { FunctionComponent } from "react";

const Grid: FunctionComponent = (): JSX.Element => {
  return (
    <div className="relative w-full h-full row-start-5 grid grid-flow-col auto-cols-[auto auto] py-16">
      <div className="relative w-fit h-full col-start-1 grid grid-flow-col auto-cols-[auto auto] gap-20 place-self-center">
        <div className="relative w-[50vw] h-80 col-start-1 row-start-1 row-span-1 bg-grayBlue grid grid-flow-col auto-cols-[auto auto]">
          <div className="relative w-fit h-fit grid grid-flow-col auto-cols-[auto auto] place-self-end pb-4 pr-4">
            <div className="relative w-fit h-fit bg-black rounded-lg grid grid-flow-col auto-cols-[auto auto]">
              <div className="relative w-fit h-fit text-white font-libR px-10 py-2">
                HUMAN MADE
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full h-80 col-start-1 row-start-2 row-span-1 bg-grayBlue grid grid-flow-col auto-cols-[auto auto]">
          <div className="relative w-fit h-fit grid grid-flow-col auto-cols-[auto auto] place-self-end pb-4 pr-4">
            <div className="relative w-fit h-fit bg-black rounded-lg grid grid-flow-col auto-cols-[auto auto]">
              <div className="relative w-fit h-fit text-white font-libR px-2 py-2">
                MACHINE ASSISTED
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-80 h-full col-start-2 row-start-1 row-span-2 bg-grayBlue grid grid-flow-col auto-cols-[auto auto]">
          <div className="relative w-fit h-fit grid grid-flow-col auto-cols-[auto auto] place-self-end pb-4 pr-4">
            <div className="relative w-fit h-fit bg-black rounded-lg grid grid-flow-col auto-cols-[auto auto]">
              <div className="relative w-fit h-fit text-white font-libR px-2 py-2">
                SOURCE PERSISTANT
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grid;

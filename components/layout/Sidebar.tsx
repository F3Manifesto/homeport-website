import Image from "next/image";
import { FunctionComponent } from "react";
import useLayout from "./hooks/useLayout";

const Sidebar: FunctionComponent = (): JSX.Element => {
  const { clicked, setClicked } = useLayout();
  return (
    <div className="h-fit min-h-screen sm:min-h-screen sm:h-fit absolute w-40 right-0 flex justify-end z-30">
      <div className="relative auto-rows-[auto auto] grid-flow-row h-full min-h-screen w-fit justify-between content-between grid pr-4 pt-6 pb-6">
        <div className="relative w-fit row-start-1 h-full place-self-end">
          <div
            className="cursor-empireS relative"
            onClick={() => setClicked(!clicked)}
          >
            <Image width={50} height={40} src="/images/heartbar.gif" priority />
          </div>
          {clicked && (
            <div className="absolute text-base font-alber text-offWhite text-right">
              Did you <br />
              expect this <br />
              to go somewhere?
            </div>
          )}
        </div>
        <div className="relative w-fit row-start-2 h-full">
          <div className="cursor-empireS relative h-fit w-fit">
            <Image
              width={50}
              height={20}
              src="/images/f3mstatic.gif"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;

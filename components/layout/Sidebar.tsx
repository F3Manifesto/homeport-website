import Image from "next/image";
import { FunctionComponent } from "react";
import useLayout from "./hooks/useLayout";

const Sidebar: FunctionComponent = (): JSX.Element => {
  const { clicked, setClicked } = useLayout();
  return (
    <div className="h-[160vh] sm:min-h-fit sm:h-[100vh] absolute w-40 right-0 flex justify-end z-30">
      <div className="absolute w-fit top-0 right-0 min-h-screen">
        <div
          className="cursor-empireS relative top-0 m-6"
          onClick={() => setClicked(!clicked)}
        >
          <Image width={50} height={40} src="/images/heartbar.gif" priority />
        </div>
        {clicked && (
          <div className="absolute text-base font-alber text-offWhite text-right top-20 right-8">
            Did you <br />
            expect this <br />
            to go somewhere?
          </div>
        )}
        <div className="cursor-empireS absolute m-6 bottom-6 h-fit w-fit">
          <Image width={140} height={50} src="/images/f3mstatic.gif" priority />
        </div>
      </div>
    </div>
  );
};
export default Sidebar;

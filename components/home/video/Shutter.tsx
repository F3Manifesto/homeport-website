import { FunctionComponent } from "react";
import { INFURA_GATEWAY } from "../../../lib/constants";

const Shutter: FunctionComponent = (): JSX.Element => {
  return (
    <div className="relative flex w-full h-full items-start justify-center ml-0 flex-col top-[0.5rem] half:top-[1.5rem] midi:top-[3rem] gap-10 left-12 midi:left-20">
      {[
        "QmNS1DJqH8XEXSoAVRtJ89iegcTQvu8nZPo79ozNgHPMmp",
        "QmSweJiaPzfewwfFxPiJ1ERhoy25DXK5RCGtzdaoovgviE",
        "QmdmACJZ2erwjM6pQVobqi9c2nkAzSDS8CNBv91csyGUZd",
      ].map((video: string, index: number) => {
        return (
          <div
            className="relative w-fit h-fit flex items-center justfiy-center"
            key={index}
          >
            <div className="relative flex items-center justify-center w-52 h-60 sm:w-[11vw] sm:h-[14.3vw] rounded-3xl bg-offBlue border-offBlue shadow-film shadow-rose-600 cursor-empireS border-b-2 border-t-4 border-r-4 half:border-r-8">
              <video
                autoPlay
                muted
                loop
                className="absolute max-h-full max-w-none h-full w-full object-cover rounded-3xl opacity-70"
              >
                <source
                  src={`${INFURA_GATEWAY}/ipfs/${video}`}
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Shutter;

import { FunctionComponent } from "react";
import { INFURA_GATEWAY } from "../../../lib/constants";
import { FilmProps } from "../types/home.types";
import Image from "next/image";

const Film: FunctionComponent<FilmProps> = ({
  clicked,
  setClicked,
}): JSX.Element => {
  return (
    <div className="flex items-center justify-center h-screen w-full relative bg-offBlack">
      <div className="absolute top-0 right-3 w-fit h-full flex items-center justify-between z-30 flex-col gap-3">
        <div className="relative w-fit h-fit flex items-center justify-center flex-col gap-2 mt-0 top-5">
          <div
            className={`cursor-empireS relative flex items-center justify-center w-12 h-9`}
            onClick={() => setClicked(!clicked)}
          >
            <Image
              layout="fill"
              draggable={false}
              src="/images/heartbar.gif"
              priority
            />
          </div>
          {clicked && (
            <div className="relative text-right flex items-center justify-center w-fit h-fit font-alber text-offWhite text-base">
              Did you <br />
              expect this <br />
              to go somewhere?
            </div>
          )}
        </div>
        <div className="relative mb-0 bottom-5 flex items-center justify-center w-fit h-fit cursor-empireS">
          <div className="relative w-10 h-4 flex items-center justify-center">
            <Image
              draggable={false}
              src="/images/f3mstatic.gif"
              priority
              layout="fill"
            />
          </div>
        </div>
      </div>
      <div className="relative min-h-full h-full w-full">
        <video
          className="relative h-full flex items-center justify-center w-full object-cover"
          autoPlay
          muted
          loop
          poster={`${INFURA_GATEWAY}/ipfs/Qma9uA5oK2yfr2upLoYjAnuZ6q1xBd5bu7yXac6ZfESV8G`}
        >
          <source src="/videos/homevideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-16 hidden sm:flex items-center justify-center w-fit h-full p-4">
          <div className="relative flex w-full h-full items-start justify-between flex-col gap-10">
            {[
              { image: "QmNS1DJqH8XEXSoAVRtJ89iegcTQvu8nZPo79ozNgHPMmp" },
              {
                image: "QmSweJiaPzfewwfFxPiJ1ERhoy25DXK5RCGtzdaoovgviE",
                link: "https://kinora.irrevocable.dev/video/0x01c6a9-0x49",
              },
              {
                image: "QmdmACJZ2erwjM6pQVobqi9c2nkAzSDS8CNBv91csyGUZd",
                link: "https://kinora.irrevocable.dev/video/0x01c6a9-0x48",
              },
            ].map(
              (
                video: {
                  image: string;
                  link?: string;
                },
                index: number
              ) => {
                return (
                  <div
                    className="relative w-fit h-full flex items-center justfiy-center"
                    key={index}
                  >
                    <div
                      className="relative flex items-center justify-center w-44 h-full rounded-3xl bg-offBlue border-offBlue shadow-film shadow-rose-600 cursor-empireS border-b-2 border-t-4 border-r-4 half:border-r-8"
                      onClick={() => video.link && window.open(video.link)}
                    >
                      <video
                        autoPlay
                        muted
                        loop
                        className="absolute max-h-full max-w-none h-full w-full object-cover rounded-3xl opacity-70"
                      >
                        <source
                          src={`${INFURA_GATEWAY}/ipfs/${video.image}`}
                          type="video/mp4"
                        />
                      </video>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Film;

import { FunctionComponent, useState } from "react";
import Sidebar from "../../layout/Sidebar";
import Shutter from "./Shutter";

const VintageFilm: FunctionComponent = (): JSX.Element => {
  const [showBanner, setShowBanner] = useState(true);
  setTimeout(() => {
    setShowBanner(false);
  }, 10000);
  return (
    <div
      className="min-w-full min-h-full xl:min-h-[100vh] w-full h-full relative block clear-both overflow-hidden bg-offBlack"
      id="lanvideo"
    >
      {showBanner && (
        <div className="bg-offBlack text-offWhite font-firaL text-xs sm:text-sm p-4 ease-out duration-1000 transition delay-500">
          Your signal may not be strong enough to load this interface all at
          once.
          <br />
          <br />
          These looks are worth the wait. They transport us to a parallel
          present where you can use all the bandwidth you need.
        </div>
      )}

      <Sidebar />
      <div className="relative min-h-full h-full w-full">
        <video
          className="relative h-full min-h-full object-cover"
          autoPlay
          muted
          loop
          placeholder="blur"
        >
          <source src="/videos/homevideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 hidden sm:flex">
          <Shutter />
        </div>
      </div>
    </div>
  );
};

export default VintageFilm;

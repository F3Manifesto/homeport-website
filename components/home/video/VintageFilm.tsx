import { FunctionComponent } from "react";
import Sidebar from "../../layout/Sidebar";
import Shutter from "./Shutter";

const VintageFilm: FunctionComponent = (): JSX.Element => {
  return (
    <div className="min-h-full h-full min-w-full w-full relative block clear-both overflow-hidden">
      <Sidebar />
      <div className="relative min-h-full h-full w-full">
        <video
          className="relative h-full min-h-full object-cover"
          autoPlay
          muted
          loop
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

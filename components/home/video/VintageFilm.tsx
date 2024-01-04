import { FunctionComponent } from "react";
import Sidebar from "../../layout/Sidebar";
import Shutter from "./Shutter";
import { INFURA_GATEWAY } from "../../../lib/constants";

const VintageFilm: FunctionComponent = (): JSX.Element => {
  return (
    <div
      className="min-w-full min-h-full xl:min-h-[100vh] wide:min-h-fit w-full h-full relative block clear-both overflow-hidden bg-offBlack"
      id="lanvideo"
    >
      <Sidebar />
      <div className="relative min-h-full h-full w-full">
        <video
          className="relative h-full min-h-full w-full object-cover"
          autoPlay
          muted
          loop
          poster={`${INFURA_GATEWAY}/ipfs/Qma9uA5oK2yfr2upLoYjAnuZ6q1xBd5bu7yXac6ZfESV8G`}
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

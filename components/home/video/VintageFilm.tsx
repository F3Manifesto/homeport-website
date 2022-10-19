import { FunctionComponent, useEffect, useRef } from "react";
import Sidebar from "../../layout/Sidebar";
import Shutter from "./Shutter";

const VintageFilm: FunctionComponent = (): JSX.Element => {
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      isMounted.current = true;
    }, 3000)
   
    console.log(isMounted, "me");
  },[]);

  return (
    <div
      className="min-w-full w-full h-full relative block clear-both overflow-hidden bg-offBlack"
    >
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

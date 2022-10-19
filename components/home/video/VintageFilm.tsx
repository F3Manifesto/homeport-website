import { FunctionComponent, useEffect, useRef } from "react";
import Sidebar from "../../layout/Sidebar";
import Shutter from "./Shutter";

const VintageFilm: FunctionComponent = (): JSX.Element => {
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    console.log(isMounted);
    isMounted.current = true;
    console.log(isMounted);
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <>
      {isMounted ? (
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
      ) : (
        <div className="min-h-screen h-screen bg-offBlack min-w-full w-full relative block clear-both overflow-hidden"></div>
      )}
    </>
  );
};

export default VintageFilm;

import { FunctionComponent } from "react";

const VintageFilm: FunctionComponent = (): JSX.Element => {
  return (
    <div className="h-screen w-screen relative min-h-fit">
      <div className="relative min-h-full top-0">
        <video
          className="absolute max-w-none h-[160vh] sm:min-h-full sm:h-[100vh] lg:w-full lg:h-full object-cover sm:right-auto -right-[35rem] -top-10"
          autoPlay
          muted
          loop
        >
          <source src="/videos/homevideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute grid grid-rows-4 grid-flow-col auto-cols-3 w-full sm:w-auto h-[100vh] max-w-full sm:left-6 max-h-full gap-44">
          <div className="w-40 h-52 rounded-3xl bg-offBlue border-b-2 border-t-4 border-r-8 border-offBlue border-solid shadow-film shadow-rose-600 relative m-4 ml-8 cursor-empireS">
            <video
              autoPlay
              muted
              loop
              className="absolute max-h-full max-w-none h-full w-full object-cover rounded-3xl"
            >
              <source src="/videos/scrollfeed/scroll1.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="w-40 h-52 rounded-3xl bg-offBlue border-b-4 border-t-6 border-r-2 border-l-2 border-offBlue border-solid shadow-film2 shadow-rose-600 relative m-4 ml-8 cursor-empireS">
            <video
              autoPlay
              muted
              loop
              className="absolute max-h-full max-w-none h-full w-full object-cover rounded-3xl"
            >
              <source src="/videos/scrollfeed/scroll2.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="w-40 h-52 rounded-3xl bg-offBlue border-b-4 border-t-2 border-r-4 border-offBlue border-solid shadow-film shadow-rose-600 relative m-4 ml-8 cursor-empireS">
            <video
              autoPlay
              muted
              loop
              className="absolute max-h-full max-w-none h-full w-full object-cover rounded-3xl"
            >
              <source src="/videos/scrollfeed/scroll3.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VintageFilm;

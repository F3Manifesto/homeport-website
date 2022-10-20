import { FunctionComponent } from "react";

const Shutter: FunctionComponent = (): JSX.Element => {
  return (
    <div className="relative grid auto-cols-[auto auto] grid-flow-col w-full justify-items-center sm:w-fit min-h-full h-full gap-10 pl-[4vw] pt-0.5 md:pt-[1.5vw] lg:pt-[3.5vw]">
      <div className="relative col-start-1 row-start-1 w-fit h-fit">
        <div className="w-52 h-60 sm:w-[11vw] sm:h-[14.3vw] rounded-3xl bg-offBlue border-b-2 border-t-4 border-r-8 border-offBlue border-solid shadow-film shadow-rose-600 relative cursor-empireS">
          <video
            autoPlay
            muted
            loop
            placeholder="blur"
            className="absolute max-h-full max-w-none h-full w-full object-cover rounded-3xl"
          >
            <source src="/videos/scrollfeed/scroll1.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="relative col-start-1 row-start-2 w-fit h-fit">
        <div className="w-52 h-60 sm:w-[11vw] sm:h-[14.3vw] rounded-3xl bg-offBlue border-b-4 border-t-6 border-r-2 border-l-2 border-offBlue border-solid shadow-film2 shadow-rose-600 relative cursor-empireS">
          <video
            autoPlay
            muted
            loop
            placeholder="blur"
            className="absolute max-h-full max-w-none h-full w-full object-cover rounded-3xl"
          >
            <source src="/videos/scrollfeed/scroll2.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="relative col-start-1 row-start-3 w-fit h-fit">
        <div className="w-52 h-60 sm:w-[11vw] sm:h-[14.3vw] rounded-3xl bg-offBlue border-b-4 border-t-2 border-r-4 border-offBlue border-solid shadow-film shadow-rose-600 relative cursor-empireS">
          <video
            autoPlay
            muted
            loop
            placeholder="blur"
            className="absolute max-h-full max-w-none h-full w-full object-cover rounded-3xl"
          >
            <source src="/videos/scrollfeed/scroll3.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default Shutter;

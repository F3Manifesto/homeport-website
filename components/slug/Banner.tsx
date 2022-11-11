import Image from "next/legacy/image";
import { FunctionComponent } from "react";
import useBanner from "./hooks/useBanner";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner: FunctionComponent = (): JSX.Element => {
  const { imageList, currentIndex, setCurrentIndex, direction, setDirection } =
    useBanner();

  return (
    <div className="relative bg-black w-full h-full grid grid-flow-row auto-rows-[auto auto]">
      <Carousel
        autoPlay
        infiniteLoop
        stopOnHover
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        className="relative w-full h-full row-start-1 grid grid-flow-col auto-cols-[auto auto]"
      >
        {imageList.map((image: string, index: number) => {
          return (
            <div
              className="relative w-full h-full col-start-1 grid grid-flow-row auto-rows-[auto auto]"
              key={index}
            >
              <div className="relative w-full h-[50vw] row-start-1">
                <Image
                  src={`/images/${image}.png`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="relative w-fit h-fit text-white font-animosaL row-start-2 self-end justify-self-center grid grid-flow-col auto-cols-[auto auto] pb-28 pt-8">
                <div className="col-start-1 relative w-fit h-fit border-2 border-white grid grid-flow-col auto-cols-[auto auto] p-3 rounded-xl px-6">
                  <div className="relative w-fit h-fit place-self-center col-start-1 text-sm">
                    SIMILAR LOOKS
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
      <div className="relative w-full h-[35vw] row-start-2">
        <Image src="/images/text.png" layout="fill" objectFit="cover" />
      </div>
    </div>
  );
};

export default Banner;

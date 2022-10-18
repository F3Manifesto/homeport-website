import { FunctionComponent } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const Slider: FunctionComponent = (): JSX.Element => {
  const images: string[] = [
    "slider1",
    "slider2",
    "slider3",
    "slider4",
    "slider5",
    "slider6",
    "slider7",
    "slider8",
    "slider9",
    "slider10",
    "slider11",
    "slider12",
    "slider13",
    "slider14",
    "slider15",
    "slider16",
    "slider17",
    "slider18",
    "slider19",
    "slider20",
    "slider21",
    "slider22",
    "slider23",
    "slider24",
    "slider25",
    "slider26",
    "slider27",
    "slider28",
    "slider29",
    "slider30",
    "slider31"
  ];

  return (
    <div className="min-h-60 h-60 flex relative w-full bg-offWhite cursor-empireA overflow-hidden">
      <Marquee className="flex" pauseOnHover pauseOnClick direction="right">
        {images.map((image, key) => {
          return (
            <div
              key={key}
              className="min-h-60 min-w-60 h-60 w-60 relative mr-4"
            >
              <Image
                src={`/images/slider/${image}.png`}
                objectFit="cover"
                layout="fill"
                priority
              />
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default Slider;

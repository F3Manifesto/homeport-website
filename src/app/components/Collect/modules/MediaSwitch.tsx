import { FunctionComponent, JSX } from "react";
import Image from "next/legacy/image";
import Waveform from "./Waveform";
import { MediaSwitchProps } from "../types/collect.types";

const MediaSwitch: FunctionComponent<MediaSwitchProps> = ({
  type,
  srcUrl,
  srcCover,
  classNameVideo,
  classNameImage,
  classNameAudio,
  objectFit,
  hidden,
}): JSX.Element => {
  switch (type?.toLowerCase()) {
    case "video":
      const keyValueVideo = srcUrl + Math.random().toString();
      return (
        <>
          <video
            draggable={false}
            controls={false}
            playsInline
            id={keyValueVideo}
            className={classNameVideo}
            poster={srcCover}
            autoPlay={hidden}
            muted
            loop={hidden}
          >
            <source src={srcUrl} />
          </video>
          {!hidden && (
            <Waveform
              audio={srcUrl}
              type={"video"}
              keyValue={keyValueVideo}
              video={srcUrl}
            />
          )}
        </>
      );

    case "audio":
      const keyValueAudio = srcUrl + Math.random().toString();
      return (
        <>
          <Image
            src={srcCover!}
            layout="fill"
            objectFit={objectFit ? "contain" : "cover"}
            className={classNameAudio}
            draggable={false}
          />
          {!hidden && (
            <Waveform
              audio={srcUrl}
              type={"audio"}
              keyValue={keyValueAudio}
              video={srcUrl}
            />
          )}
        </>
      );

    default:
      return (
        <Image
          src={srcUrl}
          layout="fill"
          objectFit={objectFit ? "contain" : "cover"}
          objectPosition={"center"}
          className={classNameImage}
          draggable={false}
        />
      );
  }
};

export default MediaSwitch;

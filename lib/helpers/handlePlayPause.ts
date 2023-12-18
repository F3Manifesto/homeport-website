import { MutableRefObject } from "react";
import WaveSurfer from "wavesurfer.js";

const handlePlayPause = (
  key: string,
  wavesurfer: MutableRefObject<WaveSurfer | null>,
  type: string
) => {
  const videoElement = document.getElementById(key) as HTMLVideoElement;

  try {
    if (wavesurfer.current) {
      if (videoElement && type === "video") {
        if (videoElement.paused) {
          videoElement.play();
          wavesurfer.current.play();
        } else {
          videoElement.pause();
          wavesurfer.current.pause();
        }
      } else {
        if (wavesurfer.current.isPlaying()) {
          wavesurfer.current.pause();
        } else {
          wavesurfer.current.play();
        }
      }
    }
  } catch (err: any) {
    console.error(err.message);
  }
};

export default handlePlayPause;

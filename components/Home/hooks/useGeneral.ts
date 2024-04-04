import { useEffect, useState } from "react";
import { BOARD_IMAGES } from "../../../lib/constants";
import { NextRouter } from "next/router";

const useGeneral = (router: NextRouter) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [videoImage, setVideoImage] = useState<string | undefined>();
  const [mainImages, setMainImages] = useState<string[]>(
    BOARD_IMAGES.sort(() => Math.random() - 0.5).slice(0, 5)
  );
  const [mainImage, setMainImage] = useState<string>(BOARD_IMAGES[0]);
  const messages: { en: string; es: string }[] = [
    {
      en: "Did you think I wouldn't notice?",
      es: "¿Pensaste que no me daría cuenta?",
    },
    {
      en: "Feeling better now?",
      es: "¿Te sientes mejor ahora?",
    },
  ];
  const [message, setMessage] = useState<string>(
    messages[Math.floor(messages.length * Math.random())][
      router.locale as "en" | "es"
    ]
  );

  useEffect(() => {
    setMessage(
      messages[Math.floor(messages.length * Math.random())][
        router.locale as "en" | "es"
      ]
    );
  }, [router.locale]);

  return {
    clicked,
    setClicked,
    mainImages,
    setMainImages,
    mainImage,
    setMainImage,
    videoImage,
    setVideoImage,
    message,
  };
};

export default useGeneral;

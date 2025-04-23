import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useCommon = () => {
  const path = usePathname();
  const [videoImage, setVideoImage] = useState<string | undefined>();
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
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setMessage(
      messages[Math.floor(messages.length * Math.random())][
        (path.match(/(?<=\/)(en|es)(?=\/)/)?.[0] as any as "es") || "en"
      ]
    );
  }, [path]);

  return {
    message,
    setVideoImage,
    videoImage,
  };
};

export default useCommon;

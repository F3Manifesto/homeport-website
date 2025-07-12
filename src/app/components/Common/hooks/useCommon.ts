import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useCommon = (lang: string) => {
  const path = usePathname();
  const [videoImage, setVideoImage] = useState<string | undefined>();
  const messages: { en: string; es: string; ar: string; pt: string }[] = [
    {
      en: "Did you think I wouldn't notice?",
      es: "¿Pensaste que no me daría cuenta?",
      ar: "فاكر إني مش هالاحظ؟",
      pt: "Achou que eu não ia perceber?",
    },
    {
      en: "Feeling better now?",
      es: "¿Te sientes mejor ahora?",
      ar: "حاسس إنك أحسن دلوقتي؟",
      pt: "Se sentindo melhor agora?",
    },
  ];
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setMessage(
      messages[Math.floor(messages.length * Math.random())][
        (path.match(/(?<=\/)(en|es|ar|pt|ym)(?=\/)/)?.[0] as
          | "en"
          | "es"
          | "ar"
          | "pt") ?? "en"
      ]
    );
  }, [path, lang]);

  return {
    message,
    setVideoImage,
    videoImage,
  };
};

export default useCommon;

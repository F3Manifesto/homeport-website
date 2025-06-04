import { LANGUAGE } from "@/app/lib/constants";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const useLanguage = () => {
  const router = useRouter();
  const path = usePathname();
  const [openLanguages, setOpenLanguages] = useState<boolean>(false);

  const changeLanguage = (lang: string) => {
    const segments = path.split("/");
    segments[1] = LANGUAGE[lang] ?? "en";
    const newPath = segments.join("/");

    document.cookie = `NEXT_LOCALE=${LANGUAGE[lang]}; path=/; SameSite=Lax`;

    router.push(newPath);
  };

  return {
    changeLanguage,
    openLanguages,
    setOpenLanguages,
  };
};

export default useLanguage;

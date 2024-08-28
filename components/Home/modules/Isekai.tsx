import { FunctionComponent } from "react";
import { IsekaiSearchProps } from "../types/home.types";
import { IDIOMAS } from "../../../lib/constants";

const Isekai: FunctionComponent<IsekaiSearchProps> = ({
  filterURL,
  t,
}): JSX.Element => {
  return (
    <div className="relative w-full h-fit flex sm:flex-nowrap flex-wrap flex-row items-start justify-start px-4 font-conso sm:pt-20 pt-10">
      <div className="relative w-full h-fit flex items-start justify-center flex-col gap-5">
        <div className="relative flex flex-wrap justify-between gap-5 w-full h-fit items-center">
          {IDIOMAS?.map((idioma: string, indice: number) => {
            return (
              <span
                className={`flex items-center justify-center rounded-full px-1 cursor-empireS w-fit h-fit relative xl:text-base inline-flex break-word`}
                key={indice}
              >
                <div
                  className={`relative rounded-full p-2 w-fit cursor-empireS hover:bg-lightYellow active:bg-grayBlue hover:text-black active:text-black text-xs galaxy:text-sm lg:text-md flex items-center justify-center ${
                    (window.location.search?.includes(idioma) ||
                      window.location.search?.includes(t(idioma))) &&
                    "bg-lightYellow text-black"
                  }`}
                  title={t(idioma)}
                  onClick={() => filterURL("portal", idioma)}
                >
                  {t(idioma)?.toUpperCase()}
                </div>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Isekai;

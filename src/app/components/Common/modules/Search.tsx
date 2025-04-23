import { ModalContext } from "@/app/providers";
import { FunctionComponent, JSX, useContext } from "react";
import { SearchProps } from "../types/common.types";

const Search: FunctionComponent<SearchProps> = ({
  handleURL,
  dict,
}): JSX.Element => {
  const context = useContext(ModalContext);
  return (
    <div className="relative w-full h-fit flex sm:flex-nowrap flex-wrap flex-row items-start justify-start px-4 font-conso gap-10">
      <div className="relative w-full h-fit flex flex-col items-start justify-start gap-10">
        <div className="relative w-full h-fit flex items-start justify-center flex-col gap-3">
          <div className="relative w-fit h-fit text-md md:text-xl">
            {dict?.common?.choose}
          </div>
          <div className="relative flex flex-wrap justify-start gap-5 w-fit h-fit items-center">
            {context?.filters?.drops?.map((drop: string, index: number) => {
              return (
                <span
                  className={`flex items-center justify-center border border-offBlack rounded-full border-x px-1 cursor-empireS w-fit h-fit relative xl:text-base inline-flex break-word`}
                  key={index}
                >
                  <div
                    className={`border border-offBlack relative rounded-full p-2 w-fit cursor-empireS hover:bg-lightYellow active:bg-grayBlue text-xs galaxy:text-sm lg:text-md flex items-center justify-center ${
                      ((window.location.search?.includes(
                        "%D8%B2%D9%86%D8%8C%D8%B2%D9%86%D8%AF%DA%AF%DB%8C%D8%8C%D8%A2%D8%B2%D8%A7%D8%AF%DB%8C"
                      ) &&
                        drop == "زن، زندگی، آزادی") ||
                        (window.location.search?.includes(
                          "%D1%84%D0%BB%D0%BE%D1%80%D0%B8%D0%B2%D0%9A%D0%B8%D1%94%D0%B2%D1%96"
                        ) &&
                          drop == "флори в Києві") ||
                        (window.location.search?.includes(
                          "%D7%92%D6%BC%D6%B0%D7%9E%D6%B7%D7%98%D6%B0%D7%A8%D6%B4%D7%99%D6%BC%D6%B8%D7%94"
                        ) &&
                          drop == "גְּמַטְרִיָּה") ||
                        window.location.search?.includes(
                          drop?.replaceAll(" ", "")?.replaceAll("’", "")
                        )) &&
                      "bg-lightYellow"
                    }`}
                    title={drop}
                    onClick={() => handleURL("collection", drop)}
                  >
                    {drop?.toUpperCase()}
                  </div>
                </span>
              );
            })}
          </div>
        </div>
        <div className="relative w-full h-fit flex items-start justify-center flex-col gap-3">
          <div className="relative w-fit h-fit text-md md:text-xl">
            {dict?.common?.filter}
          </div>
          <div className="flex items-center justify-center border border-offBlack rounded-full border-x px-1 h-fit w-fit relative">
            <input
              className="border border-offBlack bg-offWhite caret-offBlue focus:caret-offBlue rounded-full p-2 w-36 font-fira h-fit text-xs flex items-center justify-center relative galaxy:text-sm sm:text-base"
              name="filter"
              onChange={(e) => handleURL("name", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="relative w-full h-fit flex flex-col items-start justify-start gap-10">
        <div className="relative w-full h-fit flex items-start justify-center flex-col gap-3">
          <div className="relative w-fit h-fit text-md md:text-xl">
            {dict?.common?.sex}
          </div>
          <div className="relative flex flex-wrap justify-start gap-5 w-fit h-fit items-center">
            {context?.filters?.sexes?.map((sex: string, index: number) => {
              return (
                <span
                  className={`flex items-center justify-center border border-offBlack rounded-full border-x px-1 cursor-empireS w-fit h-fit relative xl:text-base inline-flex break-word`}
                  key={index}
                >
                  <div
                    className={`border border-offBlack relative rounded-full p-2 w-fit cursor-empireS hover:bg-lightYellow active:bg-grayBlue text-xs galaxy:text-sm lg:text-md flex items-center justify-center ${
                      window.location.search?.includes(
                        sex?.replaceAll(" ", "")
                      ) && "bg-lightYellow"
                    }`}
                    title={dict?.common?.[
                      sex?.replaceAll(" ", "")?.toLowerCase()
                    ]?.toUpperCase()}
                    onClick={() => handleURL("sex", 
                
                      
                      sex)}
                  >
                    {dict?.common?.[
                      sex?.replaceAll(" ", "")?.toLowerCase()
                    ]?.toUpperCase()}
                  </div>
                </span>
              );
            })}
          </div>
        </div>
        <div className="relative w-full h-fit flex items-start justify-center flex-col gap-3">
          <div className="relative w-fit h-fit text-md md:text-xl">
            {dict?.common?.style}
          </div>
          <div className="relative flex flex-wrap justify-start gap-5 w-fit h-fit items-center">
            {context?.filters?.styles?.map((style: string, index: number) => {
              return (
                <span
                  className={`flex items-center justify-center border border-offBlack rounded-full border-x px-1 cursor-empireS w-fit h-fit relative xl:text-base inline-flex break-word`}
                  key={index}
                >
                  <div
                    className={`border border-offBlack relative rounded-full p-2 w-fit cursor-empireS hover:bg-lightYellow active:bg-grayBlue text-xs galaxy:text-sm lg:text-md flex items-center justify-center ${
                      window.location.search?.includes(
                        style?.replaceAll(" ", "")
                      ) && "bg-lightYellow"
                    }`}
                    title={dict?.common?.[
                      style?.replaceAll(" ", "")?.toLowerCase()
                    ]?.toUpperCase()}
                    onClick={() => handleURL("style", style)}
                  >
                    {dict?.common?.[
                      style?.replaceAll(" ", "")?.toLowerCase()
                    ]?.toUpperCase()}
                  </div>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

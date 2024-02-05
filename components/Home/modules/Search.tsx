import { FunctionComponent } from "react";
import { SearchProps } from "../types/home.types";

const Search: FunctionComponent<SearchProps> = ({
  filterConstants,
  filterURL,
}): JSX.Element => {
  return (
    <div className="relative w-full h-fit flex sm:flex-nowrap flex-wrap flex-row items-start justify-start px-4 font-conso gap-10">
      <div className="relative w-full h-fit flex flex-col items-start justify-start gap-10">
        <div className="relative w-full h-fit flex items-start justify-center flex-col gap-3">
          <div className="relative w-fit h-fit text-md md:text-xl">
            CHOOSE A COLLECTION
          </div>
          <div className="relative flex flex-wrap justify-start gap-5 w-fit h-fit items-center">
            {filterConstants?.drops?.map((drop: string, index: number) => {
              return (
                <span
                  className={`flex items-center justify-center border border-offBlack rounded-full border-x px-1 cursor-empireS w-fit h-fit relative xl:text-base inline-flex break-word`}
                  key={index}
                >
                  <div
                    className={`border border-offBlack relative rounded-full p-2 w-fit cursor-empireS hover:bg-lightYellow active:bg-grayBlue text-xs galaxy:text-sm lg:text-md flex items-center justify-center ${
                      window.location.search?.includes(
                        drop?.replaceAll(" ", "")
                      ) && "bg-lightYellow"
                    }`}
                    title={drop}
                    onClick={() => filterURL("collection", drop)}
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
            FILTER BY NAME
          </div>
          <div className="flex items-center justify-center border border-offBlack rounded-full border-x px-1 h-fit w-fit relative">
            <input
              className="border border-offBlack bg-offWhite caret-offBlue focus:caret-offBlue rounded-full p-2 w-36 font-fira h-fit text-xs flex items-center justify-center relative galaxy:text-sm sm:text-base"
              name="filter"
              onChange={(e) => filterURL("name", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="relative w-full h-fit flex flex-col items-start justify-start gap-10">
        <div className="relative w-full h-fit flex items-start justify-center flex-col gap-3">
          <div className="relative w-fit h-fit text-md md:text-xl">SEX</div>
          <div className="relative flex flex-wrap justify-start gap-5 w-fit h-fit items-center">
            {filterConstants?.sexes?.map((sex: string, index: number) => {
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
                    title={sex}
                    onClick={() => filterURL("sex", sex)}
                  >
                    {sex?.toUpperCase()}
                  </div>
                </span>
              );
            })}
          </div>
        </div>
        <div className="relative w-full h-fit flex items-start justify-center flex-col gap-3">
          <div className="relative w-fit h-fit text-md md:text-xl">STYLE</div>
          <div className="relative flex flex-wrap justify-start gap-5 w-fit h-fit items-center">
            {filterConstants?.styles?.map((style: string, index: number) => {
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
                    title={style}
                    onClick={() => filterURL("style", style)}
                  >
                    {style?.toUpperCase()}
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

import { FunctionComponent } from "react";
import { SearchProps } from "./../../../types/general.types";

const Search: FunctionComponent<SearchProps> = ({
  filterConstants,
  filterURL,
  router,
}): JSX.Element => {
  return (
    <div className="flex relative h-fit max-w-screen w-full min-w-fit overflow-hidden pb-12">
      <div className="relative max-w-full w-fit h-full grid auto-cols-auto grid-flow-col">
        <div className="relative col-start-1 max-w-fit w-fit h-full row-start-1 pr-5 xl:pr-10 col-start-1">
          <div className="relative grid grid-flow-row gap-6 auto-rows-auto h-full w-fit max-w-fit">
            <div className="relative w-full h-fit row-start-1 pt-12 pl-6">
              <div className="relative w-fit h-fit grid auto-rows-auto grid-flow-row gap-2">
                <div className="font-conso relative text-md md:text-xl min-h-fit w-fit row-start-1">
                  CHOOSE A COLLECTION
                </div>
                <div className="relative w-full h-fit font-conso">
                  <div className="relative flex flex-wrap justify-start gap-2 w-fit h-fit overflow-hidden">
                    {filterConstants?.drops?.map(
                      (drop: string, index: number) => {
                        return (
                          <span
                            className={`m-2 ml-0 border border-offBlack rounded-full border-l border-r pl-1 pr-1 cursor-empireS w-fit h-fit relative xl:text-base inline-flex font-conso break-word`}
                            key={index}
                          >
                            <button
                              className={`border border-offBlack relative rounded-full py-1 px-1 sm:px-2 w-fit cursor-empireS hover:bg-lightYellow active:bg-grayBlue text-xs galaxy:text-sm lg:text-md ${
                                router.asPath.includes(drop?.replaceAll(" ", "")) && "bg-lightYellow"
                              }`}
                              name={drop}
                              onClick={() => filterURL("collection", drop)}
                            >
                              {drop?.toUpperCase()}
                            </button>
                          </span>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full h-fit row-start-2 pl-6 col-start-1">
              <div className="w-fit h-fit lg:w-20 relative col-start-1 font-conso lg:top-auto sm:pt-6 xl:pt-3">
                FILTER BY NAME
              </div>
              <div className="m-2 ml-0 border border-offBlack rounded-full border-l border-r pl-1 pr-1 h-fit w-fit lg:top-auto relative">
                <input
                  className="border border-offBlack bg-offWhite caret-offBlue focus:caret-offBlue rounded-full p-2 w-36 font-fira h-fit text-xs galaxy:text-sm sm:text-base"
                  name="filter"
                  onChange={(e) => filterURL("name", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative col-start-1 sm:col-start-2 w-fit h-full row-start-2 sm:row-start-1 sm:pl-0 pl-3 auto-rows-auto grid grid-flow-row">
          <div className="relative col-start-1 row-start-2 md:col-start-2 lg:col-start-1 w-full h-full md:row-start-1 sm:pl-0 pl-3 auto-rows-auto grid grid-flow-row">
            <div className="row-start-1 relative w-full h-fit place-self-end row-start-1 lg:row-start-2 lg:pl-0 pl-4 lg:pt-0 pt-6 sm:pt-12">
              <div className="relative grid auto-rows-auto grid-flow-row w-fit h-fit lg:gap-0 gap-2 sm:gap-4">
                <div className="w-fit h-fit relative font-conso row-start-1">
                  SEX
                </div>
                <div className="relative row-start-2 w-full h-fit font-conso">
                  <div className="relative flex flex-wrap justify-start gap-2 w-fit h-fit overflow-hidden">
                    {filterConstants?.sexes?.map(
                      (type: string, index: number) => {
                        return (
                          <span
                            className={`m-2 ml-0 border border-offBlack rounded-full border-l border-r pl-1 pr-1 cursor-empireS w-fit h-fit relative text-xs galaxy:text-sm xl:text-base inline-flex break-word`}
                            key={index}
                          >
                            <button
                              className={`border border-offBlack rounded-full p-2 w-fit cursor-empireS galaxy:whitespace-nowrap hover:bg-lightYellow active:bg-grayBlue relative ${
                                router.asPath?.includes(type?.replaceAll(" ", "")) &&
                                "bg-lightYellow"
                              }`}
                              name={type}
                              onClick={() => filterURL("sex", type)}
                            >
                              {type?.toUpperCase()}
                            </button>
                          </span>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row-start-1 relative w-full h-fit place-self-end lg:row-start-2 lg:pl-0 pl-4 lg:pt-0 pt-6 sm:pt-12">
            <div className="relative grid auto-rows-auto grid-flow-row w-fit h-fit lg:gap-0 gap-2 sm:gap-4">
              <div className="w-fit h-fit relative font-conso row-start-1">
                SELECT A
                <br />
                STYLE
              </div>
              <div className="relative row-start-2 w-full h-fit font-conso">
                <div className="relative flex flex-wrap justify-start gap-2 w-fit h-fit overflow-hidden">
                  {filterConstants?.styles?.map(
                    (style: string, index: number) => {
                      return (
                        <span
                          className={`m-2 ml-0 border border-offBlack rounded-full border-l border-r pl-1 pr-1 cursor-empireS w-fit h-fit relative text-xs galaxy:text-sm xl:text-base inline-flex`}
                          key={index}
                        >
                          <button
                            className={`border border-offBlack rounded-full p-2 w-fit cursor-empireS break-word galaxy:whitespace-nowrap hover:bg-lightYellow active:bg-grayBlue relative ${
                              router.asPath?.includes(style?.replaceAll(" ", "")) && "bg-lightYellow"
                            }`}
                            name={style}
                            onClick={() => filterURL("style", style)}
                          >
                            {style?.toUpperCase()}
                          </button>
                        </span>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

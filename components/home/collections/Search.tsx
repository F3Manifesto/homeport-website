import { FunctionComponent } from "react";
import { SearchProps } from "./../../../types/general.types";
import collections from "./../../../pages/api/collections.json";
import styles from "./../../../pages/api/styles.json";

const Search: FunctionComponent<SearchProps> = ({
  filterCollections,
  filterName,
  filterStyle,
  collectionSelect,
  styleSelect,
}): JSX.Element => {
  return (
    <div className="flex relative min-h-fit min-h-96 h-[110vh] sm:h-96 max-w-screen w-full min-w-fit overflow-hidden">
      <div className="relative max-w-full w-fit h-full grid auto-cols-[auto auto] grid-flow-col">
        <div className="relative col-start-1 max-w-fit w-fit h-full row-start-1 pr-10">
          <div className="relative auto-rows-[auto auto] h-full w-fit max-w-fit">
            <div className="relative w-full h-1/2 row-start-1 pt-12 pl-6">
              <div className="relative w-fit h-fit grid auto-rows-[auto auto] grid-flow-row gap-2">
                <div className="font-conso relative text-md md:text-xl min-h-fit w-fit row-start-1">
                  CHOOSE A COLLECTION
                </div>
                <div className="inline-flex relative w-full h-fit row-start-2 w-fit whitespace-nowrap max-w-fit w-fit">
                  <div className="relative grid auto-col-[auto auto] grid-flow-col h-fit w-fit">
                    {collections.map((collection: any, index: number) => {
                      return (
                        <div
                          className={`m-2 ml-0 border relative border-offBlack rounded-full border-l border-r pl-1 pr-1 cursor-empireS font-conso h-fit w-fit lg:col-start-${
                            index + 1
                          } lg:row-start-1 row-start-${index + 1}`}
                          key={index}
                        >
                          <button
                            className={`border border-offBlack relative rounded-full p-2 w-fit cursor-empireS hover:bg-lightYellow active:bg-grayBlue text-sm lg:text-md ${
                              collectionSelect.includes(
                                collection.collection
                              ) && "bg-lightYellow"
                            }`}
                            name={collection.collection}
                            onClick={(e: any) => filterCollections(e)}
                          >
                            {collection.collection.toUpperCase()}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full h-1/2 row-start-2 pl-6 col-start-1">
              <div className="w-fit h-fit lg:w-20 relative col-start-1 font-conso lg:top-auto top-24 sm:pt-0 pt-3">
                FILTER BY NAME
              </div>
              <div className="m-2 ml-0 border border-offBlack rounded-full border-l border-r pl-1 pr-1 h-fit w-fit lg:top-auto relative top-24">
                <input
                  className="border border-offBlack bg-offWhite caret-offBlue focus:caret-offBlue rounded-full p-2 w-36 font-fira h-fit"
                  name="filter"
                  onChange={(e) => filterName(e)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative col-start-1 sm:col-start-2 w-full h-full row-start-2 sm:row-start-1 sm:pl-0 pl-3">
          <div className="relative auto-rows-[auto auto] h-full w-full">
            <div className="relative w-full h-1/2 row-start-1 hidden lg:flex"></div>
            <div className="relative w-full h-1/2 row-start-1 lg:row-start-2 lg:pl-0 pl-4 lg:pt-0 pt-12">
              <div className="relative grid auto-rows-[auto auto] grid-flow-row w-fit h-fit">
                <div className="w-fit h-fit relative font-conso row-start-1">
                  SELECT A
                  <br />
                  STYLE
                </div>
                <div className="relative row-start-2 w-full h-fit font-conso row-start-2">
                  <div className="relative auto-cols-[auto auto] w-fit h-fit grid-flow-col grid self-start max-w-fit overflow-hidden">
                    {styles.map((style: any, index: number) => {
                      return (
                        <div
                          className={`break-after-column m-2 ml-0 border border-offBlack rounded-full border-l border-r pl-1 pr-1 cursor-empireS w-fit h-fit relative text-sm xl:text-base xl:col-start-${
                            index + 1
                          } xl:row-start-1 ${
                            index + 1 === 4 &&
                            `row-start-${
                              index + 1
                            } xl:row-start-2 lg:row-start-2`
                          }`}
                          key={index}
                        >
                          <button
                            className={`border border-offBlack rounded-full p-2 w-fit cursor-empireS whitespace-nowrap hover:bg-lightYellow active:bg-grayBlue relative ${
                              styleSelect.includes(style.style) &&
                              "bg-lightYellow"
                            }`}
                            name={style.style}
                            onClick={(e: any) => filterStyle(e)}
                          >
                            {style.style.toUpperCase()}
                          </button>
                        </div>
                      );
                    })}
                  </div>
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

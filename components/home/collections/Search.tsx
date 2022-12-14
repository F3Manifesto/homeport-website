import { FunctionComponent } from "react";
import { SearchProps } from "./../../../types/general.types";
import collections from "./../../../pages/api/collections.json";
import styles from "./../../../pages/api/styles.json";
import sex from "./../../../pages/api/sex.json";

const Search: FunctionComponent<SearchProps> = ({
  filterCollections,
  filterName,
  filterStyle,
  collectionSelect,
  styleSelect,
  sexSelect,
  filterSex,
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
                    {collections.map((collection: any, index: number) => {
                      return (
                        <span
                          className={`m-2 ml-0 border border-offBlack rounded-full border-l border-r pl-1 pr-1 cursor-empireS w-fit h-fit relative text-sm xl:text-base inline-flex font-conso`}
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
                        </span>
                      );
                    })}
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
                  className="border border-offBlack bg-offWhite caret-offBlue focus:caret-offBlue rounded-full p-2 w-36 font-fira h-fit"
                  name="filter"
                  onChange={(e) => filterName(e)}
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
                    {sex.map((type: any, index: number) => {
                      return (
                        <span
                          className={`m-2 ml-0 border border-offBlack rounded-full border-l border-r pl-1 pr-1 cursor-empireS w-fit h-fit relative text-sm xl:text-base inline-flex`}
                          key={index}
                        >
                          <button
                            className={`border border-offBlack rounded-full p-2 w-fit cursor-empireS whitespace-nowrap hover:bg-lightYellow active:bg-grayBlue relative ${
                              sexSelect.includes(type.sex) && "bg-lightYellow"
                            }`}
                            name={type.sex}
                            onClick={(e: any) => filterSex(e)}
                          >
                            {type.sex.toUpperCase()}
                          </button>
                        </span>
                      );
                    })}
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
                  {styles.map((style: any, index: number) => {
                    return (
                      <span
                        className={`m-2 ml-0 border border-offBlack rounded-full border-l border-r pl-1 pr-1 cursor-empireS w-fit h-fit relative text-sm xl:text-base inline-flex`}
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
                      </span>
                    );
                  })}
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

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
    <div className="flex relative top-20 left-4 min-h-96 h-max w-full">
      <div className="relative w-full min-h-96 h-96">
        <div className="font-conso absolute text-xl left-2 min-h-full">
          CHOOSE A COLLECTION
        </div>
        <div className="inline-flex absolute top-6 h-fit">
          {collections.map((collection: any, index: number) => {
            return (
              <div
                className="m-2 border border-offBlack rounded-full border-l border-r pl-1 pr-1 cursor-empireS font-conso"
                key={index}
              >
                <button
                  className={`border border-offBlack rounded-full p-2 w-fit cursor-empireS hover:bg-lightYellow active:bg-grayBlue ${
                    collectionSelect.includes(collection.collection) &&
                    "bg-lightYellow"
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
        <div>
          <div className="font-consoM absolute text-md top-36 inline-flex">
            <div className="flex flex-col relative">
              <div className="left-2 absolute">
                FILTER BY
                <br />
                NAME
              </div>
              <div className="top-12 relative">
                <div className="m-2 border border-offBlack rounded-full border-l border-r pl-1 pr-1">
                  <input
                    className="border border-offBlack bg-offWhite caret-offBlue focus:caret-offBlue rounded-full p-2 w-36 font-fira"
                    name="filter"
                    onChange={(e) => filterName(e)}
                  />
                </div>
              </div>
              <div className="left-72 absolute flex">
                <div className="left-2 w-40 absolute">
                  SELECT A
                  <br />
                  STYLE
                </div>
                <div className="top-12 relative">
                  <div className="inline-flex absolute h-fit text-sm">
                    {styles.map((style: any, index: number) => {
                      return (
                        <div
                          className="m-2 border border-offBlack rounded-full border-l border-r pl-1 pr-1 cursor-empireS"
                          key={index}
                        >
                          <button
                            className={`border border-offBlack rounded-full p-2 w-fit cursor-empireS whitespace-nowrap hover:bg-lightYellow active:bg-grayBlue ${
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

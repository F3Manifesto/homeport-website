import { FunctionComponent } from "react";
import useCollectionTags from "./hooks/useCollectionTags";
import lodash from "lodash";

const CollectionTags: FunctionComponent = (): JSX.Element => {
  const {
    formats,
    categories,
    randomColor,
    showFormats,
    setShowFormats,
    showCategories,
    bgColor,
    setShowCategories,
  } = useCollectionTags();
  console.log(randomColor[bgColor]);
  return (
    <div className="relative w-full h-full row-start-3 grid grid-flow-row auto-rows-[auto auto]">
      <div className="relative w-full h-full row-start-1 grid grid-flow-row auto-rows-[auto auto]">
        <div className="relative w-fit h-fit row-start-1 text-white font-economica underline underline-offset-1 pt-6 pb-3">
          available formats:
        </div>
        <div className="relative w-2/3 h-fit row-start-2 flex flex-wrap justify-start gap-2">
          {(showFormats ? formats : lodash.slice(formats, 0, 4)).map(
            (format: string, index: number) => {
              return (
                <span
                  key={index}
                  className={`relative w-fit h-fit inline-flex items-center px-3 py-1.5 rounded-full shadow-sm bg-yellowTheme cursor-pointer hover:bg-lBlue`}
                >
                  {format}
                </span>
              );
            }
          )}
          {formats.length > 4 && (
            <span
              className="relative w-fit h-9 inline-flex rounded-full shadow-sm bg-lGray grid grid-flow-col auto-cols-[auto auto] cursor-pointer active:scale-95"
              onClick={() => setShowFormats(!showFormats)}
            >
              <div className="relative w-fit h-fit place-self-center col-start-1 grid grid-flow-col auto-cols-[auto auto] px-2 py-2 gap-1 hover:opacity-60">
                <div className="relative w-1 h-1 rounded-full bg-black col-start-1"></div>
                <div className="relative w-1 h-1 rounded-full bg-black col-start-2"></div>
                <div className="relative w-1 h-1 rounded-full bg-black col-start-3"></div>
              </div>
            </span>
          )}
        </div>
      </div>
      <div className="relative w-full h-full row-start-2 grid grid-flow-row auto-rows-[auto auto]">
        <div className="relative w-fit h-fit row-start-1 text-white font-economica underline underline-offset-1 pt-6 pb-3">
          releated categories:
        </div>
        <div className="relative w-2/3 h-fit row-start-2 flex flex-wrap justify-start gap-2">
          {(showCategories ? categories : lodash.slice(categories, 0, 4)).map(
            (format: string, index: number) => {
              return (
                <span
                  key={index}
                  className={`relative w-fit h-fit inline-flex items-center px-3 py-1.5 rounded-full shadow-sm bg-yellowTheme cursor-pointer hover:bg-lBlue`}
                >
                  {format}
                </span>
              );
            }
          )}
          {categories.length > 4 && (
            <span
              className="relative w-fit h-9 inline-flex rounded-full shadow-sm bg-lGray grid grid-flow-col auto-cols-[auto auto] cursor-pointer active:scale-95"
              onClick={() => setShowCategories(!showCategories)}
            >
              <div className="relative w-fit h-fit place-self-center col-start-1 grid grid-flow-col auto-cols-[auto auto] px-2 py-2 gap-1 hover:opacity-60">
                <div className="relative w-1 h-1 rounded-full bg-black col-start-1"></div>
                <div className="relative w-1 h-1 rounded-full bg-black col-start-2"></div>
                <div className="relative w-1 h-1 rounded-full bg-black col-start-3"></div>
              </div>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionTags;

import { FunctionComponent } from "react";
import { CollectionProps } from "./../../../types/general.types";
import Gallery from "./Gallery";
import useCollections from "./hooks/useCollections";
import Search from "./Search";

const Collections: FunctionComponent<CollectionProps> = ({
  shopping,
  setOrder,
}): JSX.Element => {
  const {
    gallery,
    filterCollections,
    filterName,
    filterStyle,
    collectionSelect,
    styleSelect,
    sexSelect,
    filterSex,
  } = useCollections();
  return (
    <div
      className="w-full min-h-auto h-auto relative flex cursor-empireA"
      ref={shopping}
      id="shopping"
    >
      <div className="w-full min-h-auto bg-offWhite relative inline-block">
        <hr className="h-4 w-full bg-grayBlue top-2 absolute" />
        <Search
          styleSelect={styleSelect}
          collectionSelect={collectionSelect}
          filterStyle={filterStyle}
          filterCollections={filterCollections}
          filterName={filterName}
          sexSelect={sexSelect}
          filterSex={filterSex}
        />
        <Gallery gallery={gallery} setOrder={setOrder} />
      </div>
    </div>
  );
};

export default Collections;

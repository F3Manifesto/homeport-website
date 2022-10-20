import { FunctionComponent } from "react";
import { CollectionProps } from "./../../../types/general.types";
import Gallery from "./Gallery";
import useCollections from "./hooks/useCollections";
import Search from "./Search";

const Collections: FunctionComponent<CollectionProps> = ({shopping, setOrderIRL}): JSX.Element => {
  const {
    gallery,
    filterCollections,
    filterName,
    filterStyle,
    collectionSelect,
    styleSelect,
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
        />
        <Gallery gallery={gallery} setOrderIRL={setOrderIRL} />
      </div>
    </div>
  );
};

export default Collections;

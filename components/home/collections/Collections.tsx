import { FunctionComponent } from "react";
import { CollectionProps } from "./../../../types/general.types";
import Gallery from "./Gallery";
import Search from "./Search";

const Collections: FunctionComponent<CollectionProps> = ({
  shopping,
  gallery,
  router,
  filterConstants,
  filteredGallery,
  galleryLoading,
  filterURL,
  interactionLoaders,
  mirror,
  like,
  connected,
  lensConnected,
  openConnectModal,
  dispatch,
}): JSX.Element => {
  return (
    <div
      className="w-full min-h-auto h-auto relative flex cursor-empireA"
      ref={shopping}
      id="shopping"
    >
      <div className="w-full min-h-auto bg-offWhite relative inline-block">
        <hr className="h-4 w-full bg-grayBlue top-2 absolute" />
        <Search
          router={router}
          filterURL={filterURL}
          filterConstants={filterConstants}
        />
        <Gallery
          filteredGallery={filteredGallery}
          gallery={gallery}
          router={router}
          galleryLoading={galleryLoading}
          dispatch={dispatch}
          connected={connected}
          mirror={mirror}
          like={like}
          interactionLoaders={interactionLoaders}
          lensConnected={lensConnected}
          openConnectModal={openConnectModal}
        />
      </div>
    </div>
  );
};

export default Collections;

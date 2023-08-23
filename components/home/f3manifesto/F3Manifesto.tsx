import { FunctionComponent } from "react";
import useF3Manifesto from "./hooks/useF3Manifesto";
import MainBoard from "./MainBoard";
import { F3ManifestoProps } from "../../../types/general.types";

const F3Manifesto: FunctionComponent<F3ManifestoProps> = ({
  goShopping,
  filterStyle,
}): JSX.Element => {
  const { refreshImages, viewMainImage, mainImage, imagesURI, newImagesURI } =
    useF3Manifesto();
  return (
    <div className="flex min-h-full h-full min-w-screen cursor-empireA clear-both pt-10">
      <MainBoard
        refreshImages={refreshImages}
        viewMainImage={viewMainImage}
        mainImage={mainImage}
        imagesURI={imagesURI}
        newImagesURI={newImagesURI}
        goShopping={goShopping}
        filterStyle={filterStyle}
      />
    </div>
  );
};

export default F3Manifesto;

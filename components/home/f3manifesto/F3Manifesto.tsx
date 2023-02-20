import { FunctionComponent } from "react";
import useF3Manifesto from "./hooks/useF3Manifesto";
import MainBoard from "./MainBoard";

const F3Manifesto: FunctionComponent = (): JSX.Element => {
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
      />
    </div>
  );
};

export default F3Manifesto;

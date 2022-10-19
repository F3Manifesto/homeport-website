import { FunctionComponent } from "react";
import useF3Manifesto from "./hooks/useF3Manifesto";
import MainBoard from "./MainBoard";
import SmallBoard from "./SmallBoard";

const F3Manifesto: FunctionComponent = (): JSX.Element => {
  const { newImages, refreshImages, viewMainImage, mainImage } =
    useF3Manifesto();
  return (
    <div className="flex min-h-full h-fit min-w-screen cursor-empireA clear-both pt-10">
      <div className="half:flex half:flex-col w-full flex-auto h-full min-h-full hidden">
        <MainBoard
          refreshImages={refreshImages}
          viewMainImage={viewMainImage}
          mainImage={mainImage}
          newImages={newImages}
        />
      </div>
      <div className="flex flex-col w-full flex-auto h-full min-h-full half:hidden">
        <SmallBoard
          refreshImages={refreshImages}
          viewMainImage={viewMainImage}
          mainImage={mainImage}
          newImages={newImages}
        />
      </div>
    </div>
  );
};

export default F3Manifesto;

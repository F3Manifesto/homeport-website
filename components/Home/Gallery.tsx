import { FunctionComponent } from "react";
import useGallery from "./hooks/useGallery";

const Gallery: FunctionComponent = (): JSX.Element => {
    const {gallery} = useGallery();
    return (
        <div className="relative row-start-3 flex flex-col flex-wrap h-1/2 w-1/2">
        {gallery.map((image: string, index: number) => {
          return <div key={index} className="relative w-60 h-60 bg-grayBlue">

          </div>;
        })}
      </div>
    )
}

export default Gallery;
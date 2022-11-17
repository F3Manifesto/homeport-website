import { FunctionComponent } from "react";
import { PurchaseProps } from "../../types/general.types";
import CollectionTags from "./CollectionTags";
import ImageSlider from "./ImageSlider";
import Order from "./Order";
import Traits from "./Traits";

const Purchase: FunctionComponent<PurchaseProps> = ({ item }): JSX.Element => {
  return (
    <div className="relative grid grid-flow-col auto-cols-[auto auto] w-full h-full gap-40 justify-center">
      <div className="relative col-start-1 w-fit h-full grid grid-flow-row auto-rows-[auto auto] p-36 pr-0 gap-8">
        <ImageSlider item={item}/>
        <div className="relative w-96 h-fit row-start-2 text-left text-white font-awkward text-[2.3vw] leading-5">
          LESS DISTRACTIONS, MORE SOUL, JUST PURE INSTINCT, FORMED AS A
          MACHINE, TOLD THROUGH BEAUTIFFUL SYMBOLS, DEEPER INTERACTIONS.
        </div>
        <CollectionTags item={item} />
      </div>
      <div className="relative col-start-2 w-[55vw] h-fit grid grid-flow-row auto-rows-[auto auto] pl-0 p-36">
        <div className="relative w-fit h-fit row-start-1 text-white font-animosaEB text-[7vw] text-left leading-none min-h-80 pb-16">
          {item?.name?.toUpperCase()}
        </div>
        <Order item={item} />
        <div className="relative w-fit h-fit row-start-3 text-light text-white font-awkward text-[2vw] leading-4 pt-20">
          {item?.description}
        </div>
        <Traits />
      </div>
    </div>
  );
};

export default Purchase;

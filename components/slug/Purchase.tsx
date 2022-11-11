import { FunctionComponent } from "react";
import CollectionTags from "./CollectionTags";
import ImageSlider from "./ImageSlider";
import Order from "./Order";
import Traits from "./Traits";

const Purchase: FunctionComponent = (): JSX.Element => {
  return (
    <div className="relative grid grid-flow-col auto-cols-[auto auto] w-full h-full gap-40 justify-center">
      <div className="relative col-start-1 w-fit h-full grid grid-flow-row auto-rows-[auto auto] p-36 pr-0 gap-8">
        <ImageSlider />
        <div className="relative w-96 h-fit row-start-2 text-left text-white font-awkward text-[2.3vw] leading-5">
          LESS DISTRACTIONS, MORE SOUL, JUST PURE INSTINCT, FORMED AS A
          MACHINIE, TOLD THROUGH BEAUTIFFUL SYMBOLS, DEEPER INTERACTIONS.
        </div>
        <CollectionTags />
      </div>
      <div className="relative col-start-2 w-[55vw] h-fit grid grid-flow-row auto-rows-[auto auto] pl-0 p-36">
        <div className="relative w-fit h-fit row-start-1 text-white font-animosaEB text-[7vw] text-left leading-none min-h-80 pb-4">
          {`${"Nostalgia for balance, we walk the new vaporwave".toUpperCase()}`}
        </div>
        <Order />
        <div className="relative w-fit h-fit row-start-3 text-light text-white font-awkward text-[2vw] leading-4 pt-20">
          THE TO-27 SOUND MODULE PROVIDES SAMPLES OF DRUMS, PERCUSSION, AND
          CYMBALS -- BOTH VINTAGE AND MODERN -- RECORDED IN WORLD-CLASS
          RECORDING STUDIOS. AGLAND’S PRISMATIC SDUND MODELING IS APPLIED TO THE
          SAMPLES SO WHEN YOU STRIKE A DRUM R A CYMBAL, YOU ARE PLAYING AN
          INSTRUMENT THAT RESPONDS LIKE AN ACCOUSTIC COUNTERPART WITH
          UNPRECEDENTED SONIC RANGE AT YOUR COMMAND. YOU CAN CREATE YOUR OWN
          CUSTOMIZED DRUM KITS FOR ANY SITUATION. EDIT AND SAVE THE SOUND
          AUTOMATICALLY AND LAYER SAMPLES TOO.
        </div>
        <Traits />
      </div>
    </div>
  );
};

export default Purchase;

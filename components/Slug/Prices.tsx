import { FunctionComponent } from "react";
import { PriceProps } from "../../types/general.types";

const Prices: FunctionComponent<PriceProps> = ({
  tokens,
  layoutIndexes,
  setSelectedPrice,
  featurePrice,
  convertedPrice,
  currencyTag,
  setClickedToken,
  clickedToken,
  USDPRICESET,
}): JSX.Element => {
  return (
    <div className="relative w-full h-full row-start-1 grid grid-flow-col auto-cols-[auto auto] gap-4 pb-10 justify-start">
      <div className="relative w-full h-full col-start-1 text-white font-animosaR grid grid-flow-row auto-rows-[auto auto]">
        <div className="relative w-full h-fit row-start-1 justify-self-end pr-4 grid grid-flow-col auto-cols-[auto auto]">
          <div className="relative w-fit h-fit place-self-end col-start-1">
            {convertedPrice?.toFixed(2)} {currencyTag}
          </div>
        </div>
        <div className="relative w-full h-full row-start-2 text-8xl grid grid-flow-col auto-cols-[auto auto]">
          <div className="relative w-fit h-fit place-self-end col-start-1">
            ${featurePrice ? featurePrice?.toString() : USDPRICESET}
          </div>
        </div>
      </div>
      <div className="relative w-full h-fit col-start-2 grid grid-flow-col auto-cols-[auto auto] font-libR text-white self-center justify-self-start gap-4">
        {tokens.map((token: string, index: number) => {
          return (
            <div
              key={index}
              className={`relative ${
                index === 0
                  ? `col-start-${layoutIndexes[index]} row-start-${
                      layoutIndexes[index + 1]
                    }`
                  : index === layoutIndexes?.length - 2
                  ? `col-start-${layoutIndexes[-2]} row-start-${
                      layoutIndexes[-1]
                    }`
                  : `col-start-${layoutIndexes[index + 1]} row-start-${
                      layoutIndexes[index + 2]
                    }`
              } border-2 border-white rounded-xl text-[1.3em] w-28 h-fit grid grid-flow-col auto-cols-[auto auto] p-2 cursor-pointer active:bg-lBlue hover:bg-lBlue ${
                clickedToken === token && "bg-lBlue"
              }`}
              onClick={() => {
                setSelectedPrice(token);
                setClickedToken(token);
              }}
            >
              <div className="relative w-fit h-fit col-start-1 place-self-center text-center">
                {token}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Prices;

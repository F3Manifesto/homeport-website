import { useRouter } from "next/router";
import { FormEvent, FunctionComponent } from "react";
import { FiUpload } from "react-icons/fi";
import useOrder from "./hooks/useOrder";
import Prices from "./Prices";

const Order: FunctionComponent = (): JSX.Element => {
  const router = useRouter();
  const {
    tokens,
    layoutIndexes,
    setSelectedPrice,
    setPurchase,
    quantity,
    decreaseQuantity,
    increaseQuantity,
    setQuantity,
    featurePrice,
    convertedPrice,
    currencyTag,
    clickedToken,
    setClickedToken
  } = useOrder();
  return (
    <div className="relative w-full h-full row-start-2 grid grid-flow-row auto-rows-[auto auto]">
      <Prices
        tokens={tokens}
        layoutIndexes={layoutIndexes}
        setSelectedPrice={setSelectedPrice}
        featurePrice={featurePrice}
        currencyTag={currencyTag}
        convertedPrice={convertedPrice}
        clickedToken={clickedToken}
        setClickedToken={setClickedToken}
      />
      <div className="relative w-full h-fit row-start-2 grid grid-flow-row auto-rows-[auto auto] gap-3">
        <div className="relative w-fit h-fit row-start-1 text-white place-self-start font-economica">
          Quantity
        </div>
        <div className="relative w-fit h-fit row-start-2 grid grid-flow-col auto-cols-[auto auto] gap-10 pb-6">
          <div className="relative w-40 h-fit pt-2 pb-2 col-start-1 border-2 border-white grid grid-flow-col auto-cols-[auto auto] text-white font-lib">
            <div
              className="relative w-fit h-fit col-start-1 place-self-center cursor-pointer hover:opacity-70 active:scale-95"
              onClick={() => decreaseQuantity()}
            >
              -
            </div>
            <div className="relative w-fit h-fit col-start-2 place-self-center grid grid-flow-col auto-cols-[auto auto] font-libR text-white">
              {quantity}
              {/* <input
                type={"number"}
                placeholder={quantity.toString()}
                min={1}
                className="bg-black font-libR text-white w-20 relative pl-4 col-start-1 place-self-center"
                id="quantity"
                name="quantity"
                onChange={(e) => setQuantity(Number(e.target.value))}
              /> */}
            </div>
            <div
              className="relative w-fit h-fit col-start-3 place-self-center cursor-pointer hover:opacity-70 active:scale-95"
              onClick={() => increaseQuantity()}
            >
              +
            </div>
          </div>
          <div className="relative w-full h-fit col-start-2 grid grid-flow-col auto-cols-[auto auto] place-self-center gap-2">
            <div className="relative w-fit h-fit col-start-1 place-self-center">
              <FiUpload color="white" size={20} />
            </div>
            <div className="relative w-fit h-fit col-start-2 text-white place-self-center font-libR text-[1.3vw]">
              Share
            </div>
          </div>
        </div>
        <div
          className="relative w-full h-fit row-start-3 grid grid-flow-col auto-cols-[auto auto] bg-red-600 cursor-pointer hover:opacity-70 active:scale-95"
          onClick={() => {
            router.push("/buy-now");
            setPurchase();
          }}
        >
          <button
            className="relative w-fit h-fit p-3 place-self-center col-start-1 text-black font-economicaB text-[1.3vw]"
            type="submit"
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;

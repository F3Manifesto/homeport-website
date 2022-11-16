import { FunctionComponent, useContext } from "react";
import { FiUpload } from "react-icons/fi";
import { GlobalContext } from "../../pages/_app";
import useOrder from "./hooks/useOrder";
import PaymentButton from "./PaymentButton";
import Prices from "./Prices";
import { buildLensShareUrl } from "@infinity-keys/react-lens-share-button";
import Link from "next/link";
import { OrderProps } from "./../../types/general.types";

const Order: FunctionComponent<OrderProps> = ({ item }): JSX.Element => {
  const { quantity } = useContext(GlobalContext);
  const url = buildLensShareUrl({ postBody: "Hello, Lens!" });
  const {
    tokens,
    layoutIndexes,
    setSelectedPrice,
    setPurchase,
    decreaseQuantity,
    increaseQuantity,
    featurePrice,
    convertedPrice,
    currencyTag,
    clickedToken,
    payment,
    setPayment,
    setClickedToken,
    USDPRICESET
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
        USDPRICESET={USDPRICESET}
      />
      <div className="relative w-full h-fit row-start-2 grid grid-flow-row auto-rows-[auto auto] gap-3">
        <div className="relative w-fit h-fit row-start-1 grid grid-flow-col auto-cols-[auto auto] gap-3">
          <div className="relative w-fit h-fit col-start-1 text-white place-self-center font-economica">
            Quantity
          </div>
          <div className="relative w-fit h-fit col-start-2 text-white place-self-center self-center font-economica text-sm">
            {item.quantity + " items in drop"}
          </div>
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
            </div>
            <div
              className="relative w-fit h-fit col-start-3 place-self-center cursor-pointer hover:opacity-70 active:scale-95"
              onClick={() => increaseQuantity(item.quantity as number)}
            >
              +
            </div>
          </div>
          <Link
            href={url}
            legacyBehavior
            className="relative w-fit h-fit col-start-2 grid grid-flow-col auto-cols-[auto auto]"
          >
            <a
              target={"_blank"}
              rel="noreferrer"
              className="relative w-fit h-fit col-start-2 grid grid-flow-col auto-cols-[auto auto] gap-2 pt-2"
            >
              <div className="relative w-fit h-fit col-start-1 place-self-center">
                <FiUpload color="white" size={20} />
              </div>
              <div className="relative w-fit h-fit col-start-2 text-white place-self-center font-libR text-[1.3vw]">
                Share
              </div>
            </a>
          </Link>
        </div>
        <PaymentButton
          setPurchase={setPurchase}
          payment={payment}
          setPayment={setPayment}
          clickedToken={clickedToken}
          item={item}
          quantity={quantity}
        />
      </div>
    </div>
  );
};

export default Order;

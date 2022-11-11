import { NextPage } from "next";
import useBuyNow from "../components/BuyNow/hooks/useBuyNow";

const BuyNow: NextPage = (): JSX.Element => {
    const {setPaymentType} = useBuyNow();
  return (
    <div className="relative grid grid-flow-col auto-cols-[auto auto] w-screen h-screen justify-center grid grid-flow-row auto-rows-[auto auto]">
        <div className="relative w-fit h-fit row-start-1 self-start justify-self-center text-white">
          How would you like to pay?
        </div>
        <div className="relative w-fit h-fit row-start-2 grid grid-flow-col auto-cols-[auto auto] text-white gap-4">
          <div
            className="relative w-fit h-fit col-start-1"
            onClick={() => setPaymentType("Crypto")}
          >
            Crypto
          </div>
          <div
            className="relative w-fit h-fit col-start-2"
            onClick={() => setPaymentType("Fiat")}
          >
            Fiat
          </div>
        </div>
    </div>
  );
};

export default BuyNow;

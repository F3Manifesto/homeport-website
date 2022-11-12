import { NextPage } from "next";
import Details from "../components/Payments/Common/Details";
import OrderInfo from "../components/Payments/Common/OrderInfo";
import CryptoOrders from "../components/Payments/Crypto/CryptoOrder";

// pass props to orderinfo

const Crypto: NextPage = (): JSX.Element => {
  return (
    <div className="relative grid grid-flow-col auto-cols-[auto auto] w-full h-full min-h-screen gap-20 pt-20 pb-20">
      <div className="relative w-fit h-full col-start-1 row-start-1 place-self-center">
        <OrderInfo />
      </div>
      <div className="relative w-fit h-full col-start-2 row-start-1  place-self-center">
        <Details />
      </div>
      <div className="relative w-fit h-fit col-span-2 col-start-1 row-start-2">
        <CryptoOrders />
      </div>
    </div>
  );
};

export default Crypto;

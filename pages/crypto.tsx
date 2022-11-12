import { NextPage } from "next";
import OrderInfo from "../components/Payments/Common/OrderInfo";
import CryptoOrders from "../components/Payments/Crypto/CryptoOrder";

const Crypto: NextPage = (): JSX.Element => {
  return (
    <div className="relative grid grid-flow-col auto-cols-[auto auto] w-full h-full min-h-screen">
      <div className="relative w-full h-full col-start-1">
        <OrderInfo />
      </div>
      <div className="relative w-full h-full col-start-2">
        <CryptoOrders />
      </div>
    </div>
  );
};

export default Crypto;

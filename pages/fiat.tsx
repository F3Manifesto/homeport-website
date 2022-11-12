import { NextPage } from "next";
import OrderInfo from "../components/Payments/Common/OrderInfo";
import StripeCheckout from "../components/Payments/Fiat/StripeCheckout";

const Fiat: NextPage = (): JSX.Element => {
  return (
    <div className="relative grid grid-flow-col auto-cols-[auto auto] w-full h-full min-h-screen">
      <div className="relative w-full h-full col-start-1">
        <OrderInfo />
      </div>
      <div className="relative w-full h-full col-start-2">
        <StripeCheckout />
      </div>
    </div>
  );
};

export default Fiat;

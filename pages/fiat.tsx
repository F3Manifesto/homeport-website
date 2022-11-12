import { NextPage } from "next";
import OrderInfo from "../components/Payments/Common/OrderInfo";
import StripeCheckout from "../components/Payments/Fiat/StripeCheckout";

// pass props to orderinfo

const Fiat: NextPage = (): JSX.Element => {
  return (
    <div className="relative grid grid-flow-col auto-cols-[auto auto] w-full h-full min-h-screen justify-center gap-20 pt-20">
      <div className="relative w-fit h-full col-start-1 place-self-center">
        <OrderInfo />
      </div>
      <div className="relative w-fit h-full col-start-2 place-self-center">
        <StripeCheckout />
      </div>
    </div>
  );
};

export default Fiat;

import { NextPage } from "next";
import Details from "../components/Payments/Common/Details";
import OrderInfo from "../components/Payments/Common/OrderInfo";
import StripeCheckout from "../components/Payments/Fiat/StripeCheckout";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Fiat: NextPage = (): JSX.Element => {
  console.log(useSelector((state: RootState) => state.app.itemReducer));
  return (
    <div className="relative grid grid-flow-col auto-cols-[auto auto] w-full h-full min-h-screen justify-center gap-20 pt-20 pb-20">
      <div className="relative w-fit h-full col-start-1 row-start-1 place-self-center">
        <OrderInfo name={"name"} />
      </div>
      <div className="relative w-fit h-full col-start-2 row-start-1  place-self-center">
        <Details />
      </div>
      <div className="relative w-fit h-fit col-span-2 col-start-1 row-start-2">
        <StripeCheckout />
      </div>
    </div>
  );
};

export default Fiat;

import { NextPage } from "next";
import Details from "../components/Payments/Common/Details";
import OrderInfo from "../components/Payments/Common/OrderInfo";
import StripeCheckout from "../components/Payments/Fiat/StripeCheckout";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import useDetails from "../components/Payments/Common/hooks/useDetails";

const Fiat: NextPage = (): JSX.Element => {
  const items = useSelector((state: RootState) => state.app.itemReducer);
  const { handleAddressSubmit, detailsSuccess } = useDetails();
  return (
    <div className="relative grid grid-flow-col auto-cols-[auto auto] w-full h-full min-h-screen justify-center gap-20 pt-20 pb-20">
      <div className="relative w-fit h-full col-start-1 row-start-1 place-self-center">
        <OrderInfo item={items} />
      </div>
      <div className="relative w-fit h-full col-start-2 row-start-1  place-self-center">
        <Details
          handleAddressSubmit={handleAddressSubmit}
          detailsSuccess={detailsSuccess}
        />
      </div>
      {detailsSuccess && (
        <div className="relative w-full h-fit col-span-2 col-start-1 row-start-2 place-self-end pb-20">
          <StripeCheckout />
        </div>
      )}
    </div>
  );
};

export default Fiat;

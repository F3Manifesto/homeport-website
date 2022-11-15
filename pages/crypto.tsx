import { NextPage } from "next";
import Details from "../components/Payments/Common/Details";
import OrderInfo from "../components/Payments/Common/OrderInfo";
import CryptoOrders from "../components/Payments/Crypto/CryptoOrder";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import useDetails from "../components/Payments/Common/hooks/useDetails";

const Crypto: NextPage = (): JSX.Element => {
  const items = useSelector((state: RootState) => state.app.itemReducer);
  const { handleAddressSubmit, detailsSuccess } = useDetails();
  return (
    <div className="relative grid grid-flow-col auto-cols-[auto auto] w-fit h-fit min-h-screen gap-16 pt-20 pb-20 px-16 justify-center place-content-center">
      <div className="relative w-full h-full col-start-1 row-start-1 place-self-start">
        <OrderInfo item={items} />
      </div>
      <div className="relative w-full h-full col-start-2 row-start-1">
        <Details
          handleAddressSubmit={handleAddressSubmit}
          detailsSuccess={detailsSuccess}
        />
      </div>
      {detailsSuccess && (
        <div className="relative w-full h-fit col-span-2 col-start-1 row-start-2 place-self-end">
          <CryptoOrders />
        </div>
      )}
    </div>
  );
};

export default Crypto;

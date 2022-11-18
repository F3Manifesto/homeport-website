import { NextPage } from "next";
import Details from "../components/Payments/Common/Details";
import OrderInfo from "../components/Payments/Common/OrderInfo";
import CryptoOrders from "../components/Payments/Crypto/CryptoOrder";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import useDetails from "../components/Payments/Common/hooks/useDetails";
import Link from "next/link";

const Crypto: NextPage = (): JSX.Element => {
  const items = useSelector((state: RootState) => state.app.itemReducer);
  const { setDetailsSuccess, detailsSuccess } = useDetails();
  const pageType = useSelector(
    (state: RootState) => state.app.pageReducer.value
  );

  if (!pageType) {
    return (
      <div className="relative min-h-screen min-w-screen h-screen w-screen grid grid-flow-col auto-cols-[auto auto] bg-shaded">
        <div className="relative w-fit h-fit place-self-center text-yellowTheme font-economica p-6 text-center text-3xl">
          Choose a product before you checkout!
          <br /> <br />
          <Link legacyBehavior href="/">
            <a className="hover:opacity-80 cursor-pointer">
              Explore Products ...{" "}
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative grid grid-flow-col auto-cols-[auto auto] w-fit h-fit min-h-screen gap-16 pt-20 pb-20 px-16 justify-center place-content-center">
      <div className="relative w-full h-full col-start-1 row-start-1 place-self-start">
        <OrderInfo item={items} />
      </div>
      <div className="relative w-full h-full col-start-2 row-start-1">
        <Details
          detailsSuccess={detailsSuccess}
          setDetailsSuccess={setDetailsSuccess}
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

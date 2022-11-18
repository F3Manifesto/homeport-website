import { NextPage } from "next";
import Details from "../components/Payments/Common/Details";
import OrderInfo from "../components/Payments/Common/OrderInfo";
import StripeCheckout from "../components/Payments/Fiat/StripeCheckout";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import useDetails from "../components/Payments/Common/hooks/useDetails";
import Link from "next/link";

const Fiat: NextPage = (): JSX.Element => {
  const items = useSelector((state: RootState) => state.app.itemReducer);
  const { detailsSuccess, setDetailsSuccess } = useDetails();
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
    <div className="relative grid grid-flow-col auto-cols-[auto auto] w-full h-full min-h-screen justify-center gap-20 pt-20 pb-20">
      <div className="relative w-fit h-full col-start-1 row-start-1 place-self-center">
        <OrderInfo item={items} />
      </div>
      <div className="relative w-full h-fit col-start-2 grid grid-flow-col auto-cols-auto gap-10">
        <Details
          setDetailsSuccess={setDetailsSuccess}
          detailsSuccess={detailsSuccess}
        />
        {detailsSuccess && (
          <div className="relative w-full place-self-start h-full row-start-2 place-self-end">
            <StripeCheckout />
          </div>
        )}
      </div>
    </div>
  );
};

export default Fiat;

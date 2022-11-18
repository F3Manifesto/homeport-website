import { FunctionComponent } from "react";
import ActiveDrops from "./ActiveDrops";
import useActiveDrops from "./../Pricing/hooks/useActiveDrops";
import useSelectedDrops from "./hooks/useSelectedDrop";
import SelectedDrop from "./SelectedDrop";
import FulFilledOrder from "./FulfilledOrder";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import useFulfill from "./hooks/useFulfill";

const Main: FunctionComponent = (): JSX.Element => {
  const { data } = useActiveDrops();
  const { addressData } = useSelectedDrops();
  const { handleFulfillOrder, providers, setProviderValue, providerValue } =
    useFulfill();
  const productInfo = useSelector(
    (state: RootState) => state.app.fulfillReducer
  );
  return (
    <div className="relative col-start-2 w-full h-fit grid grid-flow-cols auto-cols-[auto auto] py-8 gap-12 pr-10">
      <div className="relative w-full h-fit col-start-1 grid grid-flow-row auto-rows-[auto auto]">
        <div className="relative w-full h-fit text-white font-economicaB row-start-1 grid grid-flow-row auto-rows-[auto auto]">
          <div className="relative w-fit h-fit row-start-1 text-3xl">
            FULFILLMENT
          </div>
          <div className="relative w-fit h-fit row-start-2 text-xs">
            choose a product from a drop
          </div>
        </div>
        <FulFilledOrder
          productInfo={productInfo}
          handleFulfillOrder={handleFulfillOrder}
          providers={providers}
          setProviderValue={setProviderValue}
          providerValue={providerValue}
        />
      </div>
      <div className="relative w-full h-fit col-start-2 grid grid-flow-row auto-rows-[auto auto] justify-self-end gap-16">
        <div className="relative w-fit h-fit text-white font-economicaB row-start-1 grid grid-flow-row auto-rows-[auto auto]">
          <div className="relative w-fit h-fit row-start-1 text-3xl justify-self-end">
            ACTIVE DROPS
          </div>
          <ActiveDrops data={data} />
        </div>
        <div className="relative w-full h-fit text-white font-economicaB row-start-2 grid grid-flow-row auto-rows-[auto auto]">
          <div className="relative w-fit h-fit row-start-1 text-3xl justify-self-end">
            ORDERS IN SELECTED DROP
          </div>
          <SelectedDrop addressData={addressData} />
        </div>
      </div>
    </div>
  );
};

export default Main;

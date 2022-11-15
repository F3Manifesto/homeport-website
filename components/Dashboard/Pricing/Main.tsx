import { FunctionComponent } from "react";
import useOrder from "../../Slug/hooks/useOrder";
import ActiveDrops from "./ActiveDrops";
import EditPricing from "./EditPricing";
import useActiveDrops from "./hooks/useActiveDrops";
import useAddCurrency from "./hooks/useAddCurrency";
import useSelectedDrops from "./hooks/useSelectedDrop";
import SelectedDrop from "./SelectedDrop";

const Main: FunctionComponent = (): JSX.Element => {
  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }
  //   if (isError) {
  //     return <div>Error</div>;
  //   }
  const { handleCurrencySubmit, oneCurrencyData, handleUpdateCurrency } =
    useAddCurrency();
  const { data } = useActiveDrops();
  const { productData } = useSelectedDrops();
  const {
    showCurrencyETH,
    showCurrencyMatic,
    showCurrencyMona,
    showCurrencyUsdt,
    ethConversion,
    monaConversion,
    maticConversion,
    usdtConversion,
  } = useOrder();
  return (
    <div className="relative col-start-2 w-full h-fit grid grid-flow-cols auto-cols-[auto auto] py-8 gap-12 pr-10">
      <div className="relative w-full h-fit col-start-1 grid grid-flow-row auto-rows-[auto auto]">
        <div className="relative w-full h-fit text-white font-economicaB row-start-1 grid grid-flow-row auto-rows-[auto auto]">
          <div className="relative w-fit h-fit row-start-1 text-3xl">
            PRICING
          </div>
          <div className="relative w-fit h-fit row-start-2 text-xs">
            choose a product from a drop
          </div>
        </div>
        <EditPricing
          handleCurrencySubmit={handleCurrencySubmit}
          oneCurrencyData={oneCurrencyData}
          handleUpdateCurrency={handleUpdateCurrency}
          showCurrencyETH={showCurrencyETH}
          showCurrencyMatic={showCurrencyMatic}
          showCurrencyMona={showCurrencyMona}
          showCurrencyUsdt={showCurrencyUsdt}
          ethConversion={ethConversion}
          monaConversion={monaConversion}
          maticConversion={maticConversion}
          usdtConversion={usdtConversion}
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
            PRODUCTS IN SELECTED DROP
          </div>
          <SelectedDrop productData={productData} />
        </div>
      </div>
    </div>
  );
};

export default Main;

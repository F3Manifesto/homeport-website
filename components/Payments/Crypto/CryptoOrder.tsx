import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import CurrencyTransaction from "./CurrencyTransaction";
import EthTransaction from "./EthTransaction";

const CryptoOrders: FunctionComponent = (): JSX.Element => {
  const tokenType = useSelector(
    (state: RootState) => state.app.priceReducer.token
  );
  return (
    <div className="w-full h-fit relative grid grid-flow-row auto-rows-[auto auto] gap-4">
      {tokenType === "ETH" ? <EthTransaction /> : <CurrencyTransaction />}
    </div>
  );
};

export default CryptoOrders;

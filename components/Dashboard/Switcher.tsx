import { FunctionComponent, useContext } from "react";
import MainDropDrafts from "./Drafts";
import MainDropFulFillment from "./Fulfillment";
import MainDropPricing from "./Pricing";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import SwitcherDropTypes from "./DropTypes/SwitcherDropTypes";
import MainInventory from "./Inventory/Main";

const Switcher: FunctionComponent = (): JSX.Element => {
  let action = "DROP_TYPES";
  const dashSection = useSelector(
    (state: RootState) => state.app.dashReducer.value
  );

  const decideStringAction = () => {
    action = dashSection;
    return action;
  };

  switch (decideStringAction()) {
    case "DRAFTS":
      return <MainDropDrafts />;

    case "INVENTORY":
      return (
        <MainInventory />
      );

    case "PRICING":
      return <MainDropPricing />;

    case "FULFILLMENT":
      return <MainDropFulFillment />;

    default:
      return <SwitcherDropTypes />;
  }
};

export default Switcher;

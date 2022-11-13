import { FunctionComponent } from "react";
import MainDropDrafts from "./Drafts";
import MainDropFulFillment from "./Fulfillment";
import MainDropInventory from "./Inventory";
import MainDropPricing from "./Pricing";
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import SwitcherDropTypes from "./DropTypes/SwitcherDropTypes";
import { setDisplay } from "../../redux/reducers/displaySlice";

const Switcher: FunctionComponent = (): JSX.Element => {
  let action = "DROP_TYPES";
  const dashSection = useSelector(
    (state: RootState) => state.app.dashReducer.value
  );
  const dispatch = useDispatch();

  const decideStringAction = () => {
    action = dashSection;
    return action;
  };

  switch (decideStringAction()) {
    case "DRAFTS":
      return <MainDropDrafts />;

    case "INVENTORY":
      return <MainDropInventory />;

    case "PRICING":
      return <MainDropPricing />;

    case "FULFILLMENT":
      return <MainDropFulFillment />;

    default:
      return <SwitcherDropTypes />;
  }
};

export default Switcher;

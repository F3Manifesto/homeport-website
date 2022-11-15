import { FunctionComponent } from "react";
import MainDrafts from "./Drafts/Main";
import MainFulFillment from "./Fulfillment/Main";
import MainPricing from "./Pricing/Main";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import SwitcherDropTypes from "./DropTypes/SwitcherDropTypes";
import MainInventory from "./Inventory/Main";
import MainAdmin from "./Admin/Main";
import { SwitcherDashboardProps } from "../../types/general.types";

const Switcher: FunctionComponent<SwitcherDashboardProps> = ({
  handleLandTop,
}): JSX.Element => {
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
      return <MainDrafts />;

    case "ADMIN":
      return <MainAdmin />;

    case "INVENTORY":
      return <MainInventory handleLandTop={handleLandTop} />;

    case "PRICING":
      return <MainPricing />;

    case "FULFILLMENT":
      return <MainFulFillment />;

    default:
      return <SwitcherDropTypes />;
  }
};

export default Switcher;

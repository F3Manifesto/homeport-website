import { FunctionComponent } from "react";
import Drafts from "./Drafts";
import DropTypes from "./DropTypes";
import Fulfillment from "./Fulfillment";
import useDashBoard from "./hooks/useDashboard";
import Inventory from "./Inventory";
import Pricing from "./Pricing";

const Switcher: FunctionComponent = (): JSX.Element => {
  let action = "DROP_TYPES";
  const { section } = useDashBoard();
  const decideStringAction = () => {
    if (section === "DRAFTS") {
      action = section;
    }

    if (section === "INVENTORY") {
      action = section;
    }

    if (section === "PRICING") {
      action = section;
    }

    if (section === "FULFILLMENT") {
      action = section;
    }

    return action;
  };

  switch (decideStringAction()) {
    case "DRAFTS":
      return <Drafts />;

    case "INVENTORY":
      return <Inventory />;

    case "PRICING":
      return <Pricing />;

    case "FULFILLMENT":
      return <Fulfillment />;

    default:
      return <DropTypes />;
  }
};

export default Switcher;

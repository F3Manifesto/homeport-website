import { useState } from "react";
import { UseDashboardResult } from "../../../types/general.types";

const useDashBoard = (): UseDashboardResult => {
  const sidebar: string[] = [
    "drafts",
    "drop types",
    "inventory",
    "pricing",
    "fulfillment"
  ]
  const [section, setSection] = useState<string>("DROP_TYPES");

  return { section, setSection, sidebar };
};

export default useDashBoard;

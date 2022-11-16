import { useState } from "react";
import { useHeaderLayoutResult } from "../../../types/general.types";

const useHeaderLayout = (): useHeaderLayoutResult => {
  const [showDropdownBurger, setShowDropdownBurger] = useState<boolean>(false);

  return { showDropdownBurger, setShowDropdownBurger };
};

export default useHeaderLayout;

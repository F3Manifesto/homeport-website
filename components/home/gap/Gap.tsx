import { FunctionComponent } from "react";

const Gap: FunctionComponent = (): JSX.Element => {
  return <div className="relative flex h-32 min-h-32 bg-offWhite">
    <hr className="h-2 w-full bg-lightYellow bottom-1 absolute border-0" />
    <hr className="h-1 w-full bg-midGray bottom-0 absolute border-0"/>
  </div>;
};

export default Gap;

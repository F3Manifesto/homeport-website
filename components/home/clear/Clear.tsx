import { FunctionComponent, useEffect } from "react";
import useClear from "./hooks/useClear";

const Clear: FunctionComponent = (): JSX.Element => {
  const { randomMessage, message } = useClear();
  useEffect(() => {
    randomMessage();
  }, []);
  return (
    <div className="relative flex w-full h-96 min-h-96 bg-offWhite">
      <div className="font-gaia text-3xl absolute right-40 top-1/3 text-right w-40">
        {message}
      </div>
    </div>
  );
};

export default Clear;

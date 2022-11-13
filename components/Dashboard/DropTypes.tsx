import { FunctionComponent } from "react";
import { DropInterface } from "../../types/general.types";
import useDropTypes from "./hooks/useDropTypes";

const DropTypes: FunctionComponent = (): JSX.Element => {
  const { isLoading, isError, data } = useDropTypes();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className="relative col-start-2 w-full h-fit grid grid-flow-row auto-rows-[auto auto] px-10 py-8">
      <div className="relative w-fit h-fit row-start-1 grid grid-cols-4 auto-rows-auto gap-10 place-self-center pt-10">
        {data?.map((item: DropInterface, index: number) => {
          return (
            <div className="relative w-60 h-60 bg-grayBlue font-economica text-lg grid grid-flow-col auto-cols-[auto auto]">
              <div className="relative w-fit h-fit place-self-center col-start-1 text-black">
                {item.title}
              </div>
            </div>
          );
        })}
        <span className="relative w-60 h-60 font-economica text-lg grid grid-flow-col auto-cols-[auto auto]">
          <div className="relative w-fit h-fit col-start-1 grid grid-flow-col auto-cols-[auto auto] bg-grayBlue place-self-center px-10 py-1">
            <div className="relative w-fit h-fit col-start-1 place-self-center text-black">
              new drop type
            </div>
          </div>
        </span>
      </div>
    </div>
  );
};

export default DropTypes;

import { FunctionComponent } from "react";
import useTraits from "./hooks/useTraits";

const Traits: FunctionComponent = (): JSX.Element => {
  const { traits, values } = useTraits();
  return (
    <div className="relative w-fit h-fit row-start-4 grid grid-flow-col auto-cols-[auto auto] text-white font-awkward text-4xl leading-7 pt-16 gap-40">
      <div className="relative w-fit h-fit col-start-1 grid grid-flow-row auto-rows-[auto auto]">
        {traits.map((trait: string, index: number) => {
          return (
            <div
              key={index}
              className={`row-start-${index} w-fit h-fit relative ${
                index === 9 && "pt-8"
              }`}
            >
              {trait}
            </div>
          );
        })}
      </div>
      <div className="relative w-fit h-fit col-start-2 grid grid-flow-row auto-rows-[auto auto]">
        {values.map((value: string, index: number) => {
          return (
            <div
              key={index}
              className={`row-start-${index} w-fit h-fit relative ${
                index === 9 && "pt-8"
              }`}
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Traits;

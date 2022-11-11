import { FunctionComponent } from "react";

const LargeText: FunctionComponent = (): JSX.Element => {
  return (
    <div className="relative w-full h-full row-start-2 grid grid-flow-col auto-cols-[auto auto] pt-3">
    <div className="relative w-fit h-full text-[10rem] leading-tight text-white font-libR whitespace-nowrap overflow-hidden place-self-center">
      LATENT MARKET OV
    </div>
  </div>
  );
};

export default LargeText;

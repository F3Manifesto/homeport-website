import Image from "next/legacy/image";
import { FunctionComponent } from "react";

const OrderInfo: FunctionComponent = (): JSX.Element => {
  return (
    <div className="relative w-fit h-fit grid grid-flow-col auto-cols-[auto auto] place-self-start gap-4">
      <div className="relative w-fit h-fit text-white font-libR text-3xl col-start-1 grid grid-flow-row auto-rows-[auto auto]">
        <div className="relative w-fit h-fit row-start-1">TITLE GOES HERE</div>
        <div className="relative w-fit h-fit row-start-2">PRICE</div>
        <div className="relative w-fit h-fit row-start-3">AMOUNT</div>
      </div>
      <div className="relative w-96 h-96 bg-lBlue rounded-lg col-start-2">
        <Image
          src="/images/extra.png"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default OrderInfo;

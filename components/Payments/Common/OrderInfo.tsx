import Image from "next/legacy/image";
import { FunctionComponent } from "react";
import { OrderInfoProps } from "../../../types/general.types";

const OrderInfo: FunctionComponent<OrderInfoProps> = ({
  name,
}): JSX.Element => {
  return (
    <div className="relative w-fit h-fit grid grid-flow-col auto-cols-[auto auto] place-self-start gap-4">
      <div className="relative w-full h-full col-start-1 grid grid-flow-col auto-cols-[auto auto] gap-10">
        <div className="relative w-80 h-full bg-lBlue col-start-1">
          <Image
            src="/images/extra.png"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className="relative w-96 h-fit text-white font-economica text-3xl col-start-2 grid grid-flow-row auto-rows-[auto auto] gap-8">
          <div className="relative w-fit h-fit row-start-1 text-7xl">
            Product Name
          </div>
          <div className="relative w-fit h-fit row-start-2 text-xl text-justify leading-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <div className="relative w-fit h-fit row-start-3 grid grid-flow-col auto-cols-[auto auto] gap-20 text-xl">
            <div className="col-start-1 relative w-fit h-fit grid grid-flow-col auto-cols-[auto auto] gap-3">
              <div className="relative col-start-1 w-fit h-fit">Price:</div>
              <div className="relative col-start-2 w-fit h-fit">$USD 57.00</div>
            </div>
            <div className="col-start-2 relative w-fit h-fit grid grid-flow-col auto-cols-[auto auto] gap-3">
              <div className="relative col-start-1 w-fit h-fit">Quantity:</div>
              <div className="relative col-start-2 w-fit h-fit">1</div>
            </div>
          </div>
          <div className="relative w-fit h-fit row-start-4 text-xl">
            <div className="col-start-1 relative w-fit h-fit grid grid-flow-col auto-cols-[auto auto] gap-28">
              <div className="relative col-start-1 w-fit h-fit">
                Shipping Cost:
              </div>
              <div className="relative col-start-2 w-fit h-fit">
                $20 Flat Rate
              </div>
            </div>
          </div>
          <div className="relative w-fit h-fit row-start-5 justify-self-end grid grid-flow-row auto-rows-[auto auto]">
            <div className="relative w-fit h-fit row-start-1 text-sm text-right justify-self-end">
              Estimated delivery to United States Nov 18⁠–21
            </div>
            <div className="relative w-fit h-fit row-start-2 text-sm text-right justify-self-end">
              • Paper thickness: 10.3 mil (0.26 mm)
            </div>
            <div className="relative w-fit h-fit row-start-3 text-sm text-right justify-self-end">
              • Paper weight: 5.57 oz/y² (189 g/m²)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;

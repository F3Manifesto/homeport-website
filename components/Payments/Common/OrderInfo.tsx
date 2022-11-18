import Image from "next/legacy/image";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { OrderInfoProps } from "../../../types/general.types";
import lodash from "lodash";

const OrderInfo: FunctionComponent<OrderInfoProps> = ({
  item,
}): JSX.Element => {
  const { price, token } = useSelector(
    (state: RootState) => state.app.priceReducer
  );
  return (
    <div className="relative w-fit h-fit grid grid-flow-col auto-cols-[auto auto] place-self-start gap-4">
      <div className="relative w-full h-full col-start-1 grid grid-flow-col auto-cols-[auto auto] gap-10">
        <img
          className="relative w-80 h-full bg-lBlue col-start-1 object-cover"
          src={`https://${item?.mainImage}.ipfs.w3s.link`}
        />
        <div className="relative w-96 h-fit text-white font-economica text-3xl col-start-2 grid grid-flow-row auto-rows-[auto auto] gap-8">
          <div className="relative w-fit h-fit row-start-1 text-7xl">
            {item?.name}
          </div>
          <div className="relative w-fit h-fit row-start-2 text-xl text-justify leading-5">
            {lodash.truncate(item?.description, {
              length: 400,
            })}
          </div>
          <div className="relative w-fit h-fit row-start-3 grid grid-flow-col auto-cols-[auto auto] gap-20 text-xl">
            <div className="col-start-1 relative w-fit h-fit grid grid-flow-col auto-cols-[auto auto] gap-3">
              <div className="relative col-start-1 w-fit h-fit">Price:</div>
              <div className="relative col-start-2 w-fit h-fit">
                {price * item?.quantity + " " + token}
              </div>
            </div>
            <div className="col-start-2 relative w-fit h-fit grid grid-flow-col auto-cols-[auto auto] gap-3">
              <div className="relative col-start-1 w-fit h-fit">Quantity:</div>
              <div className="relative col-start-2 w-fit h-fit">
                {item?.quantity}
              </div>
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
          <div className="relative w-fit h-fit row-start-5 justify-self-start grid grid-flow-row auto-rows-[auto auto]">
            <div className="relative w-fit h-fit row-start-1 text-sm text-right justify-self-start">
              Estimated delivery to United States Nov 18⁠–21
            </div>
            <div className="relative w-fit h-fit row-start-2 text-sm text-right justify-self-start">
              • Paper thickness: 10.3 mil (0.26 mm)
            </div>
            <div className="relative w-fit h-fit row-start-3 text-sm text-right justify-self-start">
              • Paper weight: 5.57 oz/y² (189 g/m²)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;

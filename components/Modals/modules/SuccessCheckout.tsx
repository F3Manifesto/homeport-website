import { FunctionComponent } from "react";
import { ImCross } from "react-icons/im";
import { setSuccessCheckout } from "../../../redux/reducers/successCheckoutSlice";
import Image from "next/image";
import { INFURA_GATEWAY } from "../../../lib/constants";
import { SuccessCheckoutProps } from "../types/modals.types";

const SuccessCheckout: FunctionComponent<SuccessCheckoutProps> = ({
  dispatch,
  image,
  lensConnected,
  t,
}): JSX.Element => {
  return (
    <div className="inset-0 justify-center fixed z-50 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto">
      <div className="relative w-[90vw] cursor-empireS sm:w-[50vw] half:w-[30vw] h-fit max-h-[90vh] place-self-center bg-lightWhite rounded-lg border border-black rounded-sm overflow-y-scroll">
        <div className="relative w-full h-full flex flex-col gap-5 p-2">
          <div className="relative w-fit h-fit items-end justify-end ml-auto flex cursor-pointer">
            <ImCross
              color="black"
              size={10}
              onClick={() =>
                dispatch(
                  setSuccessCheckout({
                    actionValue: false,
                  })
                )
              }
            />
          </div>
          <div className="relative w-full h-fit items-center justify-center flex flex-col gap-3 pb-4">
            <div className="relative w-2/3 h-fit items-center justify-center text-center break-words font-din text-black text-base">
              {t("success")} <br />
              <br />
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://cypher.digitalax.xyz/autograph/${
                  lensConnected?.handle?.suggestedFormatted?.localName?.split(
                    "@"
                  )?.[1]
                }`}
              >
                {" "}
                {t("view")}
              </a>
            </div>
            <div className="relative w-[25vw] h-[25vh] flex items-center justify-center p-px bg-lightYellow border border-black">
              <Image
                layout="fill"
                src={`${INFURA_GATEWAY}/ipfs/
                ${image}`}
                draggable={false}
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessCheckout;

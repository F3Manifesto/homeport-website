import { FunctionComponent, JSX, useContext } from "react";
import { ImCross } from "react-icons/im";
import Image from "next/image";
import { INFURA_GATEWAY_INTERNAL } from "../../../lib/constants";
import { ModalContext } from "@/app/providers";

const Notification: FunctionComponent = (): JSX.Element => {
  const context = useContext(ModalContext);
  return (
    <div
      className="inset-0 justify-center fixed z-50 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-empireS"
      onClick={(e) => {
        e.stopPropagation();
        context?.setNotification(undefined);
      }}
    >
      <div className="relative w-[90vw] cursor-empireA sm:w-[50vw] half:w-[30vw] h-fit max-h-[90vh] place-self-center bg-lightWhite rounded-lg border border-black rounded-sm overflow-y-scroll">
        <div className="relative w-full h-full flex flex-col gap-5 p-2">
          <div className="relative w-fit h-fit items-end justify-end ml-auto flex cursor-empireS">
            <ImCross
              color="black"
              size={10}
              onClick={(e) => {
                e.stopPropagation();
                context?.setNotification(undefined);
              }}
            />
          </div>
          <div className="relative w-full h-fit items-center justify-center flex flex-col gap-3 pb-4">
            <div className="relative w-2/3 h-fit items-center justify-center text-center break-words font-din text-black text-base">
              {context?.notification}
            </div>
            <div className="relative w-[25vw] h-[25vh] flex items-center justify-center p-px bg-lightYellow border border-black">
              <Image
                layout="fill"
                alt="F3Manifesto"
                src={`${INFURA_GATEWAY_INTERNAL}QmVFBj9iJGjTxtz471x8NncDdt4rJpkSmRCevkuLDXZy5F`}
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

export default Notification;

import React, { FunctionComponent, JSX, useContext } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import Image from "next/image";
import useLens from "../../Common/hooks/useLens";
import { useAccount } from "wagmi";
import { useModal } from "connectkit";
import { handleProfilePicture } from "@/app/lib/helpers/handleProfilePicture";
import { ModalContext } from "@/app/providers";

const Connect: FunctionComponent<{ dict: any }> = ({ dict }): JSX.Element => {
  const context = useContext(ModalContext);
  const { chainId, address, isConnected } = useAccount();
  const { openOnboarding, openSwitchNetworks } = useModal();
  const { handleLensConnect, lensLoading, logout } = useLens(address, dict);

  return (
    <div className="relative flex items-center justify-center flex-row gap-4">
      {isConnected && context?.lensConectado?.profile && (
        <div className="relative flex flex-row gap-1.5 items-center justify-center">
          <div className="relative flex items-center justify-center rounded-full w-5 h-5 bg-white border border-black">
            <Image
              layout="fill"
              src={handleProfilePicture(
                context?.lensConectado?.profile?.metadata?.picture
              )}
              draggable={false}
              className="rounded-full"
              objectFit="cover"
              alt="pfp"
            />
          </div>
          <div className="text-black text-xs relative w-fit h-fit flex items-center justify-center font-fira">
            {context?.lensConectado?.profile?.username?.localName}
          </div>
        </div>
      )}
      <div
        className="relative font-fira flex items-center justify-center text-black text-xs cursor-empireS"
        onClick={
          !isConnected
            ? () => openOnboarding()
            : isConnected && chainId !== 232
            ? () => openSwitchNetworks()
            : isConnected && !context?.lensConectado?.profile
            ? () => !lensLoading && handleLensConnect()
            : () => logout()
        }
      >
        <div
          className={`relative flex items-center justify-center ${
            lensLoading && "animate-spin"
          }`}
        >
          {lensLoading ? (
            <AiOutlineLoading size={15} color={"black"} />
          ) : !isConnected ? (
            dict?.collect?.con
          ) : isConnected && !context?.lensConectado?.profile ? (
            "Lens"
          ) : isConnected &&
            context?.lensConectado?.profile &&
            chainId != 232 ? (
            dict?.collect?.switch
          ) : (
            dict?.collect?.log
          )}
        </div>
      </div>
    </div>
  );
};

export default Connect;

import React, { FunctionComponent } from "react";
import { ConnectProps } from "../../../types/general.types";
import { AiOutlineLoading } from "react-icons/ai";
import createProfilePicture from "../../../lib/helpers/createProfilePicture";
import Image from "next/image";

const Connect: FunctionComponent<ConnectProps> = ({
  handleLensSignIn,
  openConnectModal,
  handleLogOut,
  loginLoading,
  openChainModal,
  connected,
  lensProfile,
  chain,
}): JSX.Element => {
  const profilePicture = createProfilePicture(lensProfile?.metadata?.picture);
  return (
    <div className="relative cursor-empireS flex items-center justify-center flex-row gap-4">
      {connected && lensProfile && (
        <div className="relative flex flex-row gap-1.5 items-center justify-center">
          <div className="relative flex items-center justify-center rounded-full w-5 h-5 bg-white border border-black">
            {profilePicture && (
              <Image
                layout="fill"
                src={profilePicture}
                draggable={false}
                className="rounded-full"
                objectFit="cover"
              />
            )}
          </div>
          <div className="text-black text-base relative w-fit h-fit flex items-center justify-center font-fira">
            {lensProfile?.handle?.suggestedFormatted?.localName}
          </div>
        </div>
      )}
      <div
        className="relative font-fira flex items-center justify-center text-black text-base"
        onClick={
          !connected
            ? openConnectModal
            : connected && lensProfile?.id && chain !== 137
            ? openChainModal
            : connected && !lensProfile?.id && !loginLoading
            ? () => handleLensSignIn()
            : () => handleLogOut()
        }
      >
        <div
          className={`relative flex items-center justify-center ${
            loginLoading && "animate-spin"
          }`}
        >
          {loginLoading ? (
            <AiOutlineLoading size={15} color={"black"} />
          ) : !connected ? (
            "Connect"
          ) : connected && !lensProfile?.id ? (
            "Lens"
          ) : connected && lensProfile && chain != 137 ? (
            "Switch"
          ) : (
            "Log Out"
          )}
        </div>
      </div>
    </div>
  );
};

export default Connect;

import { FunctionComponent, JSX, useContext } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "../../../lib/constants";
import useBar from "../hooks/useBar";
import { useRouter } from "next/navigation";
import { ModalContext } from "@/app/providers";
import { useAccount } from "wagmi";
import { useModal } from "connectkit";
import useLens from "../../Common/hooks/useLens";
import { InteractBarProps } from "../types/collect.types";

const InteractBar: FunctionComponent<InteractBarProps> = ({
  dict,
  post,
}): JSX.Element => {
  const context = useContext(ModalContext);
  const { chainId, address, isConnected } = useAccount();
  const { openOnboarding, openSwitchNetworks } = useModal();
  const { interactionLoading, reactPost, mirrorPost, stats } = useBar(dict, post);
  const { handleLensConnect, lensLoading } = useLens(address, dict);

  return (
    <div
      className={`w-full py-1 px-2 justify-between items-center bg-white/70 flex sm:flex-nowrap flex-wrap flex-row gap-3 z-2 cursor-default relative`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {[
        {
          count: stats?.upvotes || 0,
          image: "QmV2VzKD9NMX1CzqcwFhzwzASpPrxZYAVfZkUPiXid2TmC",
          function: () =>
            reactPost(),
          loader: interactionLoading?.like,
          name: "Like",
          reacted:stats?.hasUpvoted!,
          who: () =>
            context?.setReactBox({
              type: "Likes",
              post,
            }),
        },
        {
          count: stats?.reposts || 0,
          image: "QmQbWFsaUvQKbDpTyXesJKJM975qUEn5ncx3Mg3fs2wMZo",
          function: () => mirrorPost(),
          loader: interactionLoading?.mirror,
          name: "Mirror",
          reacted: stats?.hasReposted,
          who: () =>
            context?.setReactBox({
              type: "Mirrors",
              post,
            }),
        },
        {
          count: post?.stats?.collects || 0,
          image: "Qmde7MbuTdD4MvH9Uvns5dCiAYUxDhvAFhmKYFy6wJTMg6",
          function: () => {},
          loader: false,
          name: "Collect",
          reacted: false,
          who: () =>
            context?.setReactBox({
              type: "Collects",
              post,
            }),
        },
      ].map(
        (
          item: {
            image: string;
            count: number;
            function: () => void;
            loader: boolean;
            name: string;
            reacted: boolean;
            who: () => void;
          },
          key: number
        ) => {
          return (
            <div
              key={key}
              className="relative w-fit h-fit flex items-center cursor-default justify-center flex flex-row gap-2"
              title={item.name}
            >
              <div
                className={`relative w-4 h-4 flex items-center justify-center ${
                  item?.reacted && "mix-blend-multiply hue-rotate-60"
                } ${!item.loader && "cursor-pointer"}`}
                onClick={
                  !isConnected
                    ? () => openOnboarding()
                    : isConnected && chainId !== 232
                    ? () => openSwitchNetworks()
                    : isConnected && !context?.lensConectado?.profile
                    ? () => !lensLoading && handleLensConnect()
                    : () => item.function()
                }
              >
                {item?.loader ? (
                  <div className="flex items-center justify-center animate-spin">
                    <AiOutlineLoading color="black" size={12} />
                  </div>
                ) : (
                  <Image
                    layout="fill"
                    src={`${INFURA_GATEWAY}/ipfs/${item?.image}`}
                    draggable={false}
                  />
                )}
              </div>
              <div
                className={`relative w-fit h-fit flex items-center justify-center text-black font-din text-xxs ${
                  item?.count > 0 && "cursor-pointer"
                }`}
                onClick={() => item?.count > 0 && item.who()}
              >
                {item?.count}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default InteractBar;

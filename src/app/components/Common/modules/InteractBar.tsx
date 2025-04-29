import { FunctionComponent, JSX, useContext } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import Image from "next/image";
import { INFURA_GATEWAY_INTERNAL } from "../../../lib/constants";
import { ModalContext } from "@/app/providers";
import { InteractBarProps } from "../types/common.types";
import { useModal } from "connectkit";
import { useAccount } from "wagmi";
import useLens from "../hooks/useLens";
import useInteractions from "../hooks/useInteractions";
import { useRouter } from "next/navigation";

const InteractBar: FunctionComponent<InteractBarProps> = ({
  dict,
  post,
  title,
}): JSX.Element => {
  const context = useContext(ModalContext);
  const router = useRouter();
  const { chainId, address, isConnected } = useAccount();
  const { openOnboarding, openSwitchNetworks } = useModal();
  const { lensLoading, handleLensConnect } = useLens(address, dict);
  const { handleLike, handleMirror, interactionsLoading } =
    useInteractions(dict);
  return (
    <div
      className={`w-fit py-1 px-2 justify-start sm:justify-center items-center bg-white/70 flex sm:flex-nowrap flex-wrap flex-row gap-3 z-2 cursor-default absolute border border-black`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      style={{
        left: "0.5rem",
        bottom: "0.5rem",
      }}
    >
      {[
        {
          count: post?.stats?.upvotes || 0,
          image: "QmV2VzKD9NMX1CzqcwFhzwzASpPrxZYAVfZkUPiXid2TmC",
          function: () =>
            handleLike(post?.id, post?.operations?.hasUpvoted ? true : false),
          loader: interactionsLoading?.like,
          name: dict?.common?.like,
          reacted: post?.operations?.hasUpvoted!,
          who: () =>
            context?.setReactBox({
              type: "Likes",
              post,
            }),
        },
        {
          count: post?.stats?.reposts || 0,
          image: "QmQbWFsaUvQKbDpTyXesJKJM975qUEn5ncx3Mg3fs2wMZo",
          function: () => handleMirror(post?.id),
          loader: interactionsLoading?.mirror,
          name: dict?.common?.mirror,
          reacted: post?.operations?.hasReposted?.optimistic!,
          who: () =>
            context?.setReactBox({
              type: "Mirrors",
              post,
            }),
        },
        {
          count: post?.stats?.collects || 0,
          image: "Qmde7MbuTdD4MvH9Uvns5dCiAYUxDhvAFhmKYFy6wJTMg6",
          function: () => router.push(`/collect/${title}`),
          loader: interactionsLoading?.mirror,
          name: dict?.common?.mirror,
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
                } ${!item.loader && "cursor-empireS"}`}
                onClick={
                  !isConnected
                    ? () => openOnboarding()
                    : chainId !== 232
                    ? () => openSwitchNetworks()
                    : !context?.lensConectado?.sessionClient
                    ? () => !lensLoading && handleLensConnect()
                    : (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (!item.loader) item.function();
                      }
                }
              >
                {item?.loader ? (
                  <div className="flex items-center justify-center animate-spin">
                    <AiOutlineLoading color="black" size={12} />
                  </div>
                ) : (
                  <Image
                    alt="interact"
                    layout="fill"
                    src={`${INFURA_GATEWAY_INTERNAL}${item?.image}`}
                    draggable={false}
                  />
                )}
              </div>
              <div
                className={`relative w-fit h-fit flex items-center justify-center text-black font-din text-xxs ${
                  item?.count > 0 && "cursor-empireS"
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

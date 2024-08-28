import { FunctionComponent } from "react";
import { setReactBox } from "../../../redux/reducers/reactBoxSlice";
import { Post } from "../../../graphql/generated";
import { setLensConnectModal } from "../../../redux/reducers/lensConnectModalSlice";
import { AiOutlineLoading } from "react-icons/ai";
import Image from "next/image";
import { INFURA_GATEWAY } from "../../../lib/constants";
import { setQuoteBox } from "../../../redux/reducers/quoteBoxSlice";
import { InteractBarProps } from "../types/home.types";

const InteractBar: FunctionComponent<InteractBarProps> = ({
  token,
  like,
  dispatch,
  mirror,
  router,
  index,
  interactionLoaders,
  connected,
  lensConnected,
  openConnectModal,
  left,
  bottom,
  hideComment,
  hideCollect,
  absolute,
  main,
  isekai,
}): JSX.Element => {
  return (
    <div
      className={`w-fit py-1 px-2 justify-start sm:justify-center items-center bg-white/70 flex sm:flex-nowrap flex-wrap flex-row gap-3 z-2 cursor-default ${
        absolute && "border border-black"
      }`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      style={{
        left: absolute ? left : "auto",
        bottom: absolute ? bottom : "auto",
        position: absolute ? "absolute" : "relative",
      }}
    >
      {[
        {
          count: token?.publication?.stats?.reactions || 0,
          image: "QmV2VzKD9NMX1CzqcwFhzwzASpPrxZYAVfZkUPiXid2TmC",
          function: () =>
            main
              ? (
                  like as (
                    id: string,
                    hasReacted: boolean,
                    main: boolean,
                    quote: boolean
                  ) => Promise<void>
                )(
                  token?.publication?.id,
                  token?.publication?.operations?.hasReacted!,
                  main,
                  false
                )
              : (
                  like as (
                    id: string,
                    hasReacted: boolean,
                    isekai: boolean
                  ) => Promise<void>
                )(
                  token?.publication?.id,
                  token?.publication?.operations?.hasReacted!,
                  isekai || false
                ),
          loader: interactionLoaders?.[index]?.like,
          name: "Like",
          reacted: token?.publication?.operations?.hasReacted!,
          who: () =>
            dispatch(
              setReactBox({
                actionOpen: true,
                actionId: token?.publication?.id,
                actionType: "Likes",
              })
            ),
        },
        {
          count: token?.publication?.stats?.mirrors || 0,
          image: "QmQbWFsaUvQKbDpTyXesJKJM975qUEn5ncx3Mg3fs2wMZo",
          function: () =>
            main
              ? (
                  mirror as (
                    id: string,
                    main: boolean,
                    quote: boolean
                  ) => Promise<void>
                )(token?.publication?.id, main, false)
              : (mirror as (id: string, isekai: boolean) => Promise<void>)(
                  token?.publication?.id,
                  isekai || false
                ),
          loader: interactionLoaders?.[index]?.mirror,
          name: "Mirror",
          reacted: token?.publication?.operations?.hasMirrored!,
          who: () =>
            dispatch(
              setReactBox({
                actionOpen: true,
                actionId: token?.publication?.id,
                actionType: "Mirrors",
              })
            ),
        },
        {
          count: token?.publication?.stats?.quotes || 0,
          image: "QmWDazvMf6mLejU1QoTmMejc8jXWpiaYgd2qzXsnzAQ8ei",
          function: () =>
            dispatch(
              setQuoteBox({
                actionOpen: true,
                actionQuote: token?.publication as Post,
              })
            ),
          loader: false,
          name: "Quote",
          reacted: token?.publication?.operations?.hasQuoted!,
          who: () =>
            dispatch(
              setReactBox({
                actionOpen: true,
                actionId: token?.publication?.id,
                actionType: "Mirrors",
              })
            ),
        },
        {
          count: token?.publication?.stats?.comments || 0,
          image: "QmeHH3LN6NMgZAEFFYyN4f3z8xPHs4DHzhytjRHNBcHTza",
          function: () =>
            hideComment
              ? hideComment()
              : router.push(
                  `/collect/${token?.collectionMetadata?.title
                    ?.replaceAll(" ", "-")
                    .toLowerCase()}`
                ),
          loader: false,
          name: "Comment",
          reacted: false,
          who: () =>
            router.push(
              `/collect/${token?.collectionMetadata?.title
                ?.replaceAll(" ", "-")
                .toLowerCase()}`
            ),
        },
        {
          count: token?.publication?.stats?.countOpenActions || 0,
          image: "Qmde7MbuTdD4MvH9Uvns5dCiAYUxDhvAFhmKYFy6wJTMg6",
          function: () =>
            hideCollect
              ? hideCollect()
              : router.push(
                  `/collect/${token?.collectionMetadata?.title
                    ?.replaceAll(" ", "-")
                    .toLowerCase()}`
                ),
          loader: false,
          name: "Collect",
          reacted:
            token?.publication?.operations?.hasActed?.isFinalisedOnchain!,
          who: () =>
            dispatch(
              setReactBox({
                actionOpen: true,
                actionId: token?.publication?.id,
                actionType: "Acts",
              })
            ),
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
                  !connected
                    ? openConnectModal
                    : connected && !lensConnected?.id
                    ? (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        dispatch(setLensConnectModal(true));
                      }
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

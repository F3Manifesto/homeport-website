import { FunctionComponent } from "react";
import createProfilePicture from "../../../lib/helpers/createProfilePicture";
import { Post } from "../../../graphql/generated";
import { setReactBox } from "../../../redux/reducers/reactBoxSlice";
import { AiOutlineLoading } from "react-icons/ai";
import Image from "next/image";
import numeral from "numeral";
import { INFURA_GATEWAY } from "../../../lib/constants";
import { setQuoteBox } from "../../../redux/reducers/quoteBoxSlice";
import collectLogic from "../../../lib/helpers/collectLogic";
import HoverProfile from "./HoverProfile";
import { PostBarProps } from "../types/collect.types";

const PostBar: FunctionComponent<PostBarProps> = ({
  index,
  like,
  mirror,
  dispatch,
  simpleCollect,
  interactionsLoading,
  item,
  openMirrorChoice,
  setOpenMirrorChoice,
  profileHovers,
  setProfileHovers,
  followLoading,
  followProfile,
  unfollowProfile,
  disabled,
  commentsOpen,
  setCommentsOpen,
  main,
  lensConnected,
  top,
  bottom,
  left,
  right,
  quote,
}): JSX.Element => {
  const profilePicture = createProfilePicture(
    (item?.__typename == "Mirror" ? item?.mirrorOn : (item as Post))?.by
      ?.metadata?.picture
  );
  return (
    <div className="relative w-full justify-between flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
      <div className="relative w-fit h-fit flex flex-row items-start sm:items-center gap-2 justify-center">
        {[
          {
            image: "QmQbWFsaUvQKbDpTyXesJKJM975qUEn5ncx3Mg3fs2wMZo",
            title: "Mirrors",
            function: () =>
              setOpenMirrorChoice!((prev) => {
                const choices = [...prev!];
                choices[index] = !choices[index];
                return choices;
              }),
            loader: false,
            stats:
              (item?.__typename === "Mirror" ? item?.mirrorOn : (item as Post))
                ?.stats?.mirrors! ||
              0 +
                (item?.__typename === "Mirror"
                  ? item?.mirrorOn
                  : (item as Post)
                )?.stats?.quotes! ||
              0,
            responded:
              (item?.__typename === "Mirror" ? item?.mirrorOn : (item as Post))
                ?.operations?.hasMirrored! ||
              (item?.__typename === "Mirror" ? item?.mirrorOn : (item as Post))
                ?.operations?.hasQuoted!,
          },
          {
            image: "QmV2VzKD9NMX1CzqcwFhzwzASpPrxZYAVfZkUPiXid2TmC",
            title: "Likes",
            function: () =>
              like &&
              like(
                item?.id,
                (item?.__typename === "Mirror"
                  ? item?.mirrorOn
                  : (item as Post)
                )?.operations?.hasReacted,
                main,
                quote
              ),
            loader: interactionsLoading?.like!,
            stats:
              (item?.__typename === "Mirror" ? item?.mirrorOn : (item as Post))
                ?.stats?.reactions || 0,
            responded: (item?.__typename === "Mirror"
              ? item?.mirrorOn
              : (item as Post)
            )?.operations?.hasReacted!,
          },
          {
            image: "QmeHH3LN6NMgZAEFFYyN4f3z8xPHs4DHzhytjRHNBcHTza",
            title: "Comments",
            function: main
              ? undefined
              : () =>
                  setCommentsOpen((prev) => {
                    const arr = [...prev];
                    arr[index] = !commentsOpen[index];
                    return arr;
                  }),
            loader: false,
            stats:
              (item?.__typename === "Mirror" ? item?.mirrorOn : (item as Post))
                ?.stats?.comments || 0,
            responded: false,
          },
        ].map(
          (
            value: {
              image: string;
              title: string;
              function: (() => void) | undefined | (() => Promise<void>);
              loader: boolean;
              stats: number;
              responded: boolean;
            },
            indexTwo: number
          ) => {
            return (
              <div
                className={`relative w-full h-full flex flex-row items-center justify-center gap-1 font-din text-black`}
                key={indexTwo}
              >
                <div
                  className={`relative w-fit h-fit flex cursor-pointer items-center justify-center active:scale-95 ${
                    value?.responded && "mix-blend-hard-light hue-rotate-60"
                  }`}
                  onClick={() =>
                    disabled
                      ? window.open(
                          `https://cypher.digitalax.xyz/item/pub/${
                            item?.__typename === "Mirror"
                              ? item?.mirrorOn?.id
                              : item?.id
                          }`
                        )
                      : value?.function && value?.function()
                  }
                >
                  {value?.loader && value?.title === "Likes" ? (
                    <div className="relative w-fit h-fit animate-spin flex items-center justify-center">
                      <AiOutlineLoading size={15} color="black" />
                    </div>
                  ) : (
                    <div
                      className={`relative w-3.5 h-3.5 flex items-center justify-center ${
                        value?.function !== undefined
                          ? "cursor-pointer active:scale-95"
                          : "opacity-70"
                      } `}
                    >
                      <Image
                        layout="fill"
                        src={`${INFURA_GATEWAY}/ipfs/${value?.image}`}
                        draggable={false}
                      />
                    </div>
                  )}
                </div>
                <div
                  className={`relative w-fit h-fit flex items-center justify-center text-center text-sm ${
                    (value?.stats > 0 || value?.title === "Comments") &&
                    "cursor-pointer active:scale-95"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (disabled) {
                      window.open(
                        `https://cypher.digitalax.xyz/item/pub/${
                          item?.__typename === "Mirror"
                            ? item?.mirrorOn?.id
                            : item?.id
                        }`
                      );
                    } else {
                      value?.stats > 0 && value?.title !== "Comments"
                        ? dispatch(
                            setReactBox({
                              actionOpen: true,
                              actionId: (item?.__typename === "Mirror"
                                ? item?.mirrorOn
                                : (item as Post)
                              )?.id,
                              actionType: value?.title,
                            })
                          )
                        : window.open(
                            `https://cypher.digitalax.xyz/item/pub/${
                              item?.__typename === "Mirror"
                                ? item?.mirrorOn?.id
                                : item?.id
                            }`
                          );
                    }
                  }}
                >
                  {numeral(value?.stats).format("0a")}
                </div>
              </div>
            );
          }
        )}
      </div>
      {openMirrorChoice?.[index] && (
        <div
          className={`absolute w-fit h-fit flex flex-row gap-4 p-2 items-center justify-center bg-lightWhite rounded-sm left-2 -top-8 border border-black z-10`}
        >
          {[
            {
              image: "QmQbWFsaUvQKbDpTyXesJKJM975qUEn5ncx3Mg3fs2wMZo",
              function: () => mirror!(item?.id, main, quote),
              loader: interactionsLoading?.mirror!,
            },
            {
              image: "QmWDazvMf6mLejU1QoTmMejc8jXWpiaYgd2qzXsnzAQ8ei",
              function: () =>
                dispatch(
                  setQuoteBox({
                    actionOpen: true,
                    actionQuote: item,
                  })
                ),
              loader: false,
            },
          ].map(
            (
              value: {
                image: string;
                function: () => void;
                loader: boolean;
              },
              indexTwo: number
            ) => {
              return (
                <div
                  key={indexTwo}
                  className="relative w-fit h-fit flex cursor-pointer items-center justify-center active:scale-95 hover:opacity-70"
                  onClick={() =>
                    disabled
                      ? window.open(
                          `https://cypher.digitalax.xyz/item/pub/${
                            item?.__typename === "Mirror"
                              ? item?.mirrorOn?.id
                              : item?.id
                          }`
                        )
                      : !value?.loader && value.function()
                  }
                >
                  {value?.loader && indexTwo == 0 ? (
                    <div className="relative w-fit h-fit animate-spin flex items-center justify-center">
                      <AiOutlineLoading size={15} color="black" />
                    </div>
                  ) : (
                    <div
                      className={
                        "relative w-4 h-4 flex items-center justify-center cursor-pointer active:scale-95"
                      }
                    >
                      <Image
                        layout="fill"
                        src={`${INFURA_GATEWAY}/ipfs/${value?.image}`}
                        draggable={false}
                      />
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      )}
      <div className="relative w-fit h-fit flex flex-row gap-2 items-end sm:items-center justify-center ml-auto">
        <div
          className="relative flex items-center justify-center rounded-full w-5 h-5 cursor-pointer"
          onMouseEnter={(e) => {
            if (disabled) return;
            setProfileHovers!((prev) => {
              const arr = [...(prev || [])];
              arr[index] = true;
              return arr;
            });
          }}
        >
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
        <div
          className={`relative w-5 h-5 items-center justify-center flex ${
            (item?.__typename === "Mirror" ? item?.mirrorOn : (item as Post))
              ?.openActionModules?.[0]?.__typename ===
              "SimpleCollectOpenActionSettings" ||
            (item?.__typename === "Mirror" ? item?.mirrorOn : (item as Post))
              ?.openActionModules?.[0]?.__typename ===
              "MultirecipientFeeCollectOpenActionSettings"
              ? "cursor-pointer active:scale-95"
              : "opacity-70"
          } ${interactionsLoading?.simpleCollect && "animate-spin"} ${
            (item?.__typename === "Mirror" ? item?.mirrorOn : (item as Post))
              ?.operations?.hasActed?.value &&
            "mix-blend-hard-light hue-rotate-60"
          }`}
          onClick={() =>
            collectLogic(
              (item?.__typename === "Mirror"
                ? item?.mirrorOn
                : (item as Post)) as Post,
              disabled,
              interactionsLoading?.simpleCollect!,
              dispatch,
              main,
              quote,
              simpleCollect
            )
          }
        >
          {interactionsLoading?.simpleCollect ? (
            <AiOutlineLoading size={15} color="white" />
          ) : (
            <Image
              layout="fill"
              draggable={false}
              src={`${INFURA_GATEWAY}/ipfs/Qmde7MbuTdD4MvH9Uvns5dCiAYUxDhvAFhmKYFy6wJTMg6`}
            />
          )}
        </div>
        {profileHovers?.[index] && (
          <HoverProfile
            followLoading={followLoading!}
            followProfile={followProfile!}
            unfollowProfile={unfollowProfile!}
            publication={
              (item.__typename == "Mirror" ? item?.mirrorOn : (item as Post))
                ?.by
            }
            index={index}
            setProfileHovers={setProfileHovers!}
            dispatch={dispatch}
            lensConnected={lensConnected}
            parentId={item?.id}
            top={top}
            bottom={bottom}
            left={left}
            right={right}
            quote={quote}
          />
        )}
      </div>
    </div>
  );
};

export default PostBar;

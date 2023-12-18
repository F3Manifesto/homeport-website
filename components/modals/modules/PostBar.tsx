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
import { PostBarProps } from "../../../types/general.types";
import HoverProfile from "./HoverProfile";

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
}): JSX.Element => {
  const profilePicture = createProfilePicture(
    (item?.__typename == "Mirror" ? item?.mirrorOn : (item as Post))?.by
      ?.metadata?.picture
  );
  return (
    <div className="relative w-full justify-between flex flex-col sm:flex-row items-between sm:items-center gap-2">
      <div className="relative w-fit h-fit flex flex-row items-start sm:items-center gap-2 justify-center">
        {[
          ["QmQbWFsaUvQKbDpTyXesJKJM975qUEn5ncx3Mg3fs2wMZo", "Mirrors"],
          ["QmV2VzKD9NMX1CzqcwFhzwzASpPrxZYAVfZkUPiXid2TmC", "Likes"],
          ["QmeHH3LN6NMgZAEFFYyN4f3z8xPHs4DHzhytjRHNBcHTza", "Comments"],
        ].map((image: string[], indexTwo: number) => {
          const functions = [
            () =>
              setOpenMirrorChoice!((prev) => {
                const choices = [...prev!];
                choices[index] = !choices[index];
                return choices;
              }),

            like,
            main
              ? null
              : () =>
                  setCommentsOpen((prev) => {
                    const arr = [...prev];
                    arr[index] = !commentsOpen[index];
                    return arr;
                  }),
          ];

          const loaders = [interactionsLoading?.like];

          const stats = [
            item?.__typename === "Mirror"
              ? item?.mirrorOn?.stats?.mirrors! + item?.mirrorOn?.stats?.quotes!
              : (item as Post)?.stats?.mirrors! +
                (item as Post)?.stats?.quotes!,
            item?.__typename === "Mirror"
              ? item?.mirrorOn?.stats?.reactions
              : (item as Post)?.stats?.reactions,
            item?.__typename === "Mirror"
              ? item?.mirrorOn?.stats?.comments
              : (item as Post)?.stats?.comments,
          ];

          const responded = [
            (item?.__typename === "Mirror" ? item?.mirrorOn : (item as Post))
              ?.operations?.hasMirrored ||
              (item?.__typename === "Mirror" ? item?.mirrorOn : (item as Post))
                ?.operations?.hasQuoted,
            (item?.__typename === "Mirror" ? item?.mirrorOn : (item as Post))
              ?.operations?.hasReacted,
          ];

          return (
            <div
              className={`relative w-full h-full flex flex-row items-center justify-center gap-1 font-din text-black`}
              key={indexTwo}
            >
              <div
                className={`relative w-fit h-fit flex cursor-pointer items-center justify-center active:scale-95 ${
                  responded?.[indexTwo] && "mix-blend-hard-light hue-rotate-60"
                }`}
                onClick={() => {
                  if (disabled) {
                    window.open(
                      `https://cypher.digitalax.xyz/item/pub/${
                        item?.__typename === "Mirror"
                          ? item?.mirrorOn?.id
                          : item?.id
                      }`
                    );
                  } else {
                    if (functions[indexTwo]) {
                      if (image[1] !== "Likes") {
                        (functions[indexTwo]! as any)(
                          item?.__typename === "Mirror"
                            ? item?.mirrorOn?.id
                            : item?.id,
                          item?.__typename === "Mirror" ? item?.id : undefined
                        );
                      } else {
                        main
                          ? (functions[indexTwo] as (
                              id: string,
                              hasReacted: boolean,
                              main: boolean,
                              mirror?: string
                            ) => Promise<void>)!(
                              item?.__typename === "Mirror"
                                ? item?.mirrorOn?.id
                                : item?.id,
                              (item?.__typename === "Mirror"
                                ? item?.mirrorOn
                                : (item as Post)
                              )?.operations?.hasReacted,
                              main,
                              item?.__typename === "Mirror"
                                ? item?.id
                                : undefined
                            )
                          : (
                              functions[indexTwo]! as (
                                id: string,
                                hasReacted: boolean,
                                mirror?: string
                              ) => Promise<void>
                            )(
                              item?.id,
                              (item?.__typename === "Mirror"
                                ? item?.mirrorOn
                                : (item as Post)
                              )?.operations?.hasReacted,
                              item?.__typename === "Mirror"
                                ? item?.id
                                : undefined
                            );
                      }
                    }
                  }
                }}
              >
                {loaders[indexTwo] && image[1] === "Likes" ? (
                  <div className="relative w-fit h-fit animate-spin flex items-center justify-center">
                    <AiOutlineLoading size={15} color="black" />
                  </div>
                ) : (
                  <div
                    className={`relative w-3.5 h-3.5 flex items-center justify-center ${
                      functions[indexTwo]
                        ? "cursor-pointer active:scale-95"
                        : "opacity-70"
                    } `}
                  >
                    <Image
                      layout="fill"
                      src={`${INFURA_GATEWAY}/ipfs/${image[0]}`}
                      draggable={false}
                    />
                  </div>
                )}
              </div>
              <div
                className={`relative w-fit h-fit flex items-center justify-center text-center text-sm ${
                  (stats[indexTwo] > 0 || image[1] === "Comments") &&
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
                    stats[indexTwo] > 0 && image[1] !== "Comments"
                      ? dispatch(
                          setReactBox({
                            actionOpen: true,
                            actionId: (item?.__typename === "Mirror"
                              ? item?.mirrorOn
                              : (item as Post)
                            )?.id,
                            actionType: image[1],
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
                {numeral(stats[indexTwo]).format("0a")}
              </div>
            </div>
          );
        })}
      </div>
      {openMirrorChoice?.[index] && (
        <div
          className={`absolute w-fit h-fit flex flex-row gap-4 p-2 items-center justify-center bg-lirio/80 rounded-sm left-2 -top-8 border border-black z-10`}
        >
          {[
            "QmQbWFsaUvQKbDpTyXesJKJM975qUEn5ncx3Mg3fs2wMZo",
            "QmWDazvMf6mLejU1QoTmMejc8jXWpiaYgd2qzXsnzAQ8ei",
          ].map((image: string, indexTwo: number) => {
            const functions: ((() => void) | (() => Promise<void>))[] = [
              main
                ? () =>
                    (
                      mirror as (
                        id: string,
                        main: boolean,
                        mirror?: string
                      ) => Promise<void>
                    )(
                      item?.__typename === "Mirror"
                        ? item?.mirrorOn?.id
                        : item?.id,
                      main,
                      item?.__typename === "Mirror" ? item?.id : undefined
                    )
                : () =>
                    (mirror as (id: string, mirror?: string) => Promise<void>)(
                      item?.__typename === "Mirror"
                        ? item?.mirrorOn?.id
                        : item?.id,
                      item?.__typename === "Mirror" ? item?.id : undefined
                    ),
              () =>
                dispatch(
                  setQuoteBox({
                    actionOpen: true,
                    actionQuote: item,
                  })
                ),
            ];
            const loaders = [interactionsLoading?.mirror];
            return (
              <div
                key={indexTwo}
                className="relative w-fit h-fit flex cursor-pointer items-center justify-center active:scale-95 hover:opacity-70"
                onClick={() => {
                  if (disabled) {
                    window.open(
                      `https://cypher.digitalax.xyz/item/pub/${
                        item?.__typename === "Mirror"
                          ? item?.mirrorOn?.id
                          : item?.id
                      }`
                    );
                  } else {
                    !loaders[indexTwo] && functions[indexTwo]();
                  }
                }}
              >
                {loaders[indexTwo] && indexTwo == 0 ? (
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
                      src={`${INFURA_GATEWAY}/ipfs/${image}`}
                      draggable={false}
                    />
                  </div>
                )}
              </div>
            );
          })}
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
              main!,
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
            feed
            dispatch={dispatch}
            lensConnected={lensConnected}
            parentId={item?.id}
            top={top}
            bottom={bottom}
            left={left}
            right={right}
          />
        )}
      </div>
    </div>
  );
};

export default PostBar;

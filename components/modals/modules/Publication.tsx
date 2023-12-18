import { FunctionComponent } from "react";
import {
  Comment,
  Mirror,
  Quote,
  TextOnlyMetadataV3,
} from "../../../graphql/generated";
import moment from "moment";
import Image from "next/image";
import { INFURA_GATEWAY } from "../../../lib/constants";
import PostQuote from "./PostQuote";
import PostComment from "./PostComment";
import PostSwitch from "./PostSwitch";
import { PublicationProps } from "../../../types/general.types";
import PostBar from "./PostBar";

const Publication: FunctionComponent<PublicationProps> = ({
  item,
  index,
  dispatch,
  mirror,
  comment,
  like,
  interactionsLoading,
  profileHovers,
  setProfileHovers,
  openMirrorChoice,
  setOpenMirrorChoice,
  unfollowProfile,
  simpleCollect,
  followLoading,
  followProfile,
  disabled,
  commentsOpen,
  setCommentsOpen,
  makeComment,
  setMakePostComment,
  setContentLoading,
  contentLoading,
  postCollect,
  main,
  quote,
  lensConnected,
  setMentionProfiles,
  setProfilesOpen,
  mentionProfiles,
  profilesOpen,
  caretCoord,
  setCaretCoord,
  top,
  bottom,
  left,
  right,
}) => {
  return (
    <div
      className={`relative rounded-sm h-fit w-full lg:w-110 px-1 py-3 sm:py-2 sm:px-2 flex flex-col gap-4 sm:gap-2 border items-center justify-between border-black bg-lightYellow`}
      id={item?.id}
    >
      <div className="relative w-full h-fit flex items-center justify-between flex-row">
        <div
          className={`relative w-fit h-fit flex items-center justify-start font-din text-xxs text-black`}
        >
          <div className={`relative w-fit h-fit flex`}>
            {item?.createdAt && moment(`${item?.createdAt}`).fromNow()}
          </div>
        </div>
        {(item?.__typename === "Comment" ||
          item?.__typename === "Quote" ||
          item?.__typename === "Mirror") && (
          <div
            className={`relative w-fit h-fit row-start-1 items-center justify-end flex flex-row gap-2 font-din text-xxs`}
          >
            <div
              className={`relative w-fit h-fit col-start-1 place-self-center break-words font-din text-black ${
                item?.__typename === "Mirror" && "cursor-pointer"
              }`}
              onClick={() =>
                window.open(
                  `https://cypher.digitalax.xyz/item/pub/${
                    item?.__typename === "Mirror"
                      ? item?.mirrorOn?.id
                      : item?.id
                  }`
                )
              }
            >
              {item?.__typename === "Comment"
                ? `Comment on ${
                    (
                      (item as Comment)?.commentOn
                        ?.metadata as TextOnlyMetadataV3
                    )?.content?.slice(0, 10) + "..."
                  }`
                : item?.__typename === "Mirror"
                ? `Mirror of ${
                    (
                      (item as Mirror)?.mirrorOn?.metadata as TextOnlyMetadataV3
                    )?.content?.slice(0, 10) + "..."
                  }`
                : `Quote on ${
                    (
                      (item as Quote)?.quoteOn?.metadata as TextOnlyMetadataV3
                    )?.content?.slice(0, 10) + "..."
                  }`}
            </div>
            <div className="relative w-3.5 h-3.5 col-start-2 place-self-center">
              <Image
                layout="fill"
                src={`${INFURA_GATEWAY}/ipfs/${
                  item?.__typename === "Comment"
                    ? "QmeHH3LN6NMgZAEFFYyN4f3z8xPHs4DHzhytjRHNBcHTza"
                    : item?.__typename === "Mirror"
                    ? "QmQbWFsaUvQKbDpTyXesJKJM975qUEn5ncx3Mg3fs2wMZo"
                    : "QmWDazvMf6mLejU1QoTmMejc8jXWpiaYgd2qzXsnzAQ8ei"
                }`}
                draggable={false}
              />
            </div>
          </div>
        )}
      </div>
      <PostSwitch disabled={disabled} item={item} dispatch={dispatch} />
      {item?.__typename === "Quote" && (
        <PostQuote
          disabled={true}
          quote={item?.quoteOn as Quote}
          dispatch={dispatch}
        />
      )}
      <PostBar
        lensConnected={lensConnected}
        index={index}
        item={item}
        top={top}
        bottom={bottom}
        left={left}
        right={right}
        dispatch={dispatch}
        mirror={mirror}
        like={like}
        interactionsLoading={interactionsLoading?.[index]}
        profileHovers={profileHovers}
        setProfileHovers={setProfileHovers}
        openMirrorChoice={openMirrorChoice}
        setOpenMirrorChoice={setOpenMirrorChoice}
        simpleCollect={simpleCollect}
        followLoading={followLoading}
        followProfile={followProfile}
        unfollowProfile={unfollowProfile}
        disabled={disabled}
        setCommentsOpen={setCommentsOpen!}
        commentsOpen={commentsOpen!}
        main={main}
        quote={quote}
      />
      {commentsOpen?.[index] && (
        <PostComment
          caretCoord={caretCoord!}
          profilesOpen={profilesOpen?.[index]!}
          mentionProfiles={mentionProfiles!}
          setMentionProfiles={setMentionProfiles!}
          setCaretCoord={setCaretCoord!}
          setProfilesOpen={setProfilesOpen!}
          lensConnected={lensConnected}
          makePostComment={makeComment?.[index]!}
          setMakePostComment={setMakePostComment!}
          commentPost={comment!}
          id={item?.id}
          width={"100%"}
          commentPostLoading={interactionsLoading?.[index]?.comment!}
          height="5rem"
          imageHeight="1.25rem"
          imageWidth="1.25rem"
          postCollect={postCollect!}
          setContentLoading={setContentLoading!}
          contentLoading={contentLoading?.[index]!}
          index={index}
          dispatch={dispatch}
          main={main}
        />
      )}
    </div>
  );
};

export default Publication;

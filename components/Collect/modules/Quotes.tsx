import { FunctionComponent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Publication from "./Publication";
import { Quote } from "../../../graphql/generated";
import { QuoteCollectProps } from "../types/collect.types";

const Quotes: FunctionComponent<QuoteCollectProps> = ({
  quotes,
  getMoreQuotes,
  quotesLoading,
  quoteInfo,
  mirror,
  like,
  simpleCollect,
  dispatch,
  lensConnected,
  makeComment,
  comment,
  interactionsLoading,
  profileHovers,
  setProfileHovers,
  openMirrorChoice,
  setOpenMirrorChoice,
  unfollowProfile,
  followLoading,
  followProfile,
  commentsOpen,
  setCommentsOpen,
  setMakeComment,
  setContentLoading,
  contentLoading,
  postCollect,
  setMentionProfiles,
  setProfilesOpen,
  mentionProfiles,
  profilesOpen,
  caretCoord,
  setCaretCoord,
}): JSX.Element => {
  return (
    <div
      className="relative w-full h-[25rem] flex border-offBlack border-4 items-start p-2 overflow-y-scroll justify-center bg-lightY"
      id="fadedItem"
    >
      <div className="relative w-full h-fit flex flex-col gap-5 justify-start items-center">
        {quotesLoading ? (
          Array.from({ length: 10 }).map((_, index: number) => {
            return (
              <div
                className={`relative rounded-sm h-40 w-full sm:w-3/5 px-1 py-3 sm:py-2 border border-black sm:px-2 flex flex-col gap-4 sm:gap-2 border-2 items-center justify-between border-black bg-lightYellow animate-pulse`}
                key={index}
              ></div>
            );
          })
        ) : (
          <InfiniteScroll
            dataLength={quotes?.length}
            loader={<></>}
            hasMore={quoteInfo?.hasMore}
            next={getMoreQuotes}
            className="w-full h-fit items-center justify-start flex flex-col gap-10"
          >
            {quotes?.map((item: Quote, index: number) => {
              return (
                <Publication
                  main={false}
                  lensConnected={lensConnected}
                  index={index}
                  item={item}
                  dispatch={dispatch}
                  data-post-id={item?.id}
                  key={index}
                  top={
                    item?.metadata?.content?.length < 100 &&
                    item?.metadata?.__typename !== "AudioMetadataV3" &&
                    item?.metadata?.__typename !== "ImageMetadataV3" &&
                    item?.metadata?.__typename !== "VideoMetadataV3"
                      ? "20px"
                      : "auto"
                  }
                  bottom={
                    item?.metadata?.content?.length < 100 &&
                    item?.metadata?.__typename !== "AudioMetadataV3" &&
                    item?.metadata?.__typename !== "ImageMetadataV3" &&
                    item?.metadata?.__typename !== "VideoMetadataV3"
                      ? "auto"
                      : "2px"
                  }
                  left={"auto"}
                  right={"2px"}
                  mirror={mirror}
                  comment={comment}
                  like={like}
                  interactionsLoading={interactionsLoading}
                  profileHovers={profileHovers}
                  setProfileHovers={setProfileHovers}
                  openMirrorChoice={openMirrorChoice}
                  setOpenMirrorChoice={setOpenMirrorChoice}
                  unfollowProfile={unfollowProfile}
                  simpleCollect={simpleCollect}
                  followLoading={followLoading}
                  followProfile={followProfile}
                  commentsOpen={commentsOpen}
                  setCommentsOpen={setCommentsOpen}
                  makeComment={makeComment}
                  setMakePostComment={setMakeComment}
                  setContentLoading={setContentLoading}
                  contentLoading={contentLoading}
                  postCollect={postCollect}
                  setMentionProfiles={setMentionProfiles}
                  setProfilesOpen={setProfilesOpen}
                  mentionProfiles={mentionProfiles}
                  profilesOpen={profilesOpen}
                  caretCoord={caretCoord}
                  setCaretCoord={setCaretCoord}
                  quote
                />
              );
            })}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Quotes;

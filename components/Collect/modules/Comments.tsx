import { FunctionComponent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Publication from "./Publication";
import { Comment } from "../../../graphql/generated";
import PostComment from "./PostComment";
import { CommentProps } from "../types/collect.types";

const Comments: FunctionComponent<CommentProps> = ({
  commentsLoading,
  comments,
  getMoreComments,
  commentInfo,
  dispatch,
  lensConnected,
  comment,
  simpleCollect,
  like,
  mirror,
  commentsOpen,
  makeComment,
  interactionsLoading,
  profileHovers,
  setProfileHovers,
  openMirrorChoice,
  setOpenMirrorChoice,
  unfollowProfile,
  followProfile,
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
  mainInteractionsLoading,
  setCaretCoordMain,
  caretCoordMain,
  profilesOpenMain,
  mentionProfilesMain,
  setMentionProfilesMain,
  setProfilesOpenMain,
  mainMakeComment,
  setMainMakeComment,
  item,
  setMainContentLoading,
  mainContentLoading,
  followLoading,
  commentRef,
  quotes,
  t,
}): JSX.Element => {
  return (
    <div
      className="relative w-full h-[25rem] flex border-offBlack border-4 items-start p-2 overflow-y-scroll justify-center bg-lightY"
      id="fadedItem"
      ref={commentRef}
    >
      <div className="relative w-full h-fit flex flex-col gap-5 justify-start items-center">
        <PostComment
          t={t}
          setCaretCoord={setCaretCoordMain}
          caretCoord={caretCoordMain}
          profilesOpen={profilesOpenMain?.[0]}
          mentionProfiles={mentionProfilesMain}
          setMentionProfiles={setMentionProfilesMain}
          setProfilesOpen={setProfilesOpenMain}
          lensConnected={lensConnected}
          index={0}
          makePostComment={mainMakeComment?.[0]}
          setMakePostComment={setMainMakeComment}
          commentPost={comment}
          id={item?.publication?.id}
          commentPostLoading={mainInteractionsLoading?.[0]?.comment}
          height="8rem"
          imageHeight="1.25rem"
          imageWidth="1.25rem"
          postCollect={postCollect}
          setContentLoading={setMainContentLoading}
          contentLoading={mainContentLoading?.[0]}
          dispatch={dispatch}
          main={true}
          width={
            quotes?.length > 0
              ? "80%"
              : window.innerWidth < 640
              ? "100%"
              : "50%"
          }
        />
        {commentsLoading ? (
          Array.from({ length: 10 }).map((_, index: number) => {
            return (
              <div
                className={`relative rounded-sm h-40 w-full sm:w-3/5 px-1 py-3 sm:py-2 border border-black sm:px-2 flex flex-col gap-4 sm:gap-2 border-2 items-center justify-between border-black bg-lightYellow animate-pulse`}
                key={index}
              ></div>
            );
          })
        ) : comments?.length < 1 ? (
          <div className="relative w-fit h-fit items-center justify-center flex text-black font-din break-words">
            {t("comMake")}
          </div>
        ) : (
          <>
            <InfiniteScroll
              dataLength={comments?.length}
              loader={<></>}
              hasMore={commentInfo?.hasMore}
              next={getMoreComments}
              className="w-full h-fit items-center justify-start flex flex-col gap-10"
            >
              {comments?.map((item: Comment, index: number) => {
                return (
                  <Publication
                    main={false}
                    t={t}
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
                    quote={false}
                  />
                );
              })}
            </InfiniteScroll>
          </>
        )}
      </div>
    </div>
  );
};

export default Comments;

import Image from "next/legacy/image";
import { FunctionComponent, JSX, useContext, useRef } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { INFURA_GATEWAY } from "../../../lib/constants";
import { ImCross } from "react-icons/im";
import useComment from "../hooks/useComment";
import handleSearchProfiles from "@/app/lib/helpers/handleSearchProfiles";
import { CommentProps } from "../types/collect.types";
import { Account } from "@lens-protocol/client";
import { handleProfilePicture } from "@/app/lib/helpers/handleProfilePicture";
import { ModalContext } from "@/app/providers";
import MediaSwitch from "./MediaSwitch";
import setPostMedia from "@/app/lib/helpers/setPostMedia";

const Comment: FunctionComponent<CommentProps> = ({
  post,
  dict,
  getReferences
}): JSX.Element => {
  const textElement = useRef(null);
  const context = useContext(ModalContext);
  const {
    makeComment,
    profilesOpen,
    mentionProfiles,
    setMentionProfiles,
    setProfilesOpen,
    caretCoord,
    setCaretCoord,
    commentContent,
    setCommentContent,
    contentLoading,
    commentLoading,
    setContentLoading,
  } = useComment(post, dict, getReferences);
  return (
    <div
      className={`relative h-fit flex flex-col items-start justify-start gap-2`}
      style={{
        width:
          typeof window !== "undefined" && window.innerWidth < 640
            ? "100%"
            : "50%",
      }}
    >
      <div className="relative w-full p-2 border border-black text-black font-din text-sm bg-lightYellow flex items-center justify-center text-left rounded-md h-[8rem]">
        <textarea
          className="bg-lightYellow relative w-full text-xs h-full p-1 flex"
          style={{ resize: "none" }}
          value={commentContent?.content}
          onChange={(e) => {
            setCommentContent((prev) => ({
              ...prev,
              content: e.target.value,
            }));
            handleSearchProfiles(
              e,
              setProfilesOpen,
              setMentionProfiles,
              context?.lensConectado,
              context?.lensClient!,
              setCaretCoord,
              textElement
            );
          }}
          ref={textElement}
        ></textarea>
        {mentionProfiles?.length > 0 && profilesOpen && (
          <div
            className={`absolute w-32 border border-black max-h-28 h-fit flex flex-col overflow-y-auto items-start justify-start z-60`}
            style={{
              top: caretCoord.y + 30,
              left: caretCoord.x,
            }}
          >
            {mentionProfiles?.map((user: Account, indexTwo: number) => {
              return (
                <div
                  key={indexTwo}
                  className={`relative border-y border-black w-full h-10 px-3 py-2 bg-lightWhite flex flex-row gap-3 cursor-pointer items-center justify-center`}
                  onClick={() => {
                    setProfilesOpen(false);
                    setCommentContent((prev) => ({
                      ...prev,
                      content:
                        prev?.content?.substring(
                          0,
                          prev?.content?.lastIndexOf("@")
                        ) + `${user?.username?.localName}`,
                    }));
                  }}
                >
                  <div className="relative flex flex-row w-full h-full text-black font-din items-center justify-center gap-2">
                    <div
                      className={`relative rounded-full flex bg-lightYellow border border-black w-3 h-3 items-center justify-center`}
                    >
                      <Image
                        src={handleProfilePicture(
                          post?.author?.metadata?.picture
                        )}
                        objectFit="cover"
                        alt="pfp"
                        layout="fill"
                        className="relative w-fit h-fit rounded-full items-center justify-center flex"
                        draggable={false}
                      />
                    </div>
                    <div className="relative items-center justify-center w-fit h-fit text-xxs flex">
                      {user?.username?.localName}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="relative w-full h-fit flex flex-col sm:flex-row items-stretch justify-center sm:items-center sm:justify-between sm:gap-1.5 gap-4">
        <div className="relative w-full sm:w-fit h-fit items-center justify-start flex flex-row gap-2">
          {contentLoading ? (
            <div
              className={`relative flex items-center justify-center  ${
                contentLoading && "animate-spin"
              }`}
              style={{
                height: "1.25rem",
                width: "1.25rem",
              }}
            >
              <AiOutlineLoading size={15} color={"white"} />
            </div>
          ) : (
            <label
              className={`relative flex bg-black items-center justify-center ${
                contentLoading ||
                commentLoading ||
                commentContent?.images?.length == 4
                  ? "opacity-70"
                  : "cursor-pointer active:scale-95"
              }`}
              style={{
                height: "1.25rem",
                width: "1.25rem",
              }}
            >
              <Image
                layout="fill"
                src={`${INFURA_GATEWAY}/ipfs/QmXzLW1oUhtvBkd6GdTM1bHxqz9cSRw2UCCyT4u6FZ1QCr`}
                draggable={false}
              />
              <input
                hidden
                type="file"
                accept={"image/png, image/gif"}
                multiple={true}
                disabled={
                  contentLoading ||
                  commentLoading ||
                  (commentContent?.images?.length == 4 ? true : false)
                }
                onChange={(e) =>
                  e?.target?.files?.[0] &&
                  setPostMedia(e, setCommentContent, setContentLoading)
                }
              />
            </label>
          )}
        </div>
        <div className="relative w-full sm:w-fit h-fit items-center justify-end flex">
          <div
            className={`relative w-20 h-8 font-din text-black flex items-center justify-center bg-lightYellow border border-black text-xs rounded-sm ${
              !commentLoading && "cursor-pointer active:scale-95"
            }`}
            onClick={() => !commentLoading && makeComment()}
          >
            <div
              className={`${
                commentLoading && "animate-spin"
              } relative w-fit h-fit flex items-center justify-center text-center`}
            >
              {commentLoading ? (
                <AiOutlineLoading size={15} color="black" />
              ) : (
                dict?.collect?.send
              )}
            </div>
          </div>
        </div>
      </div>
      {commentContent?.images?.length > 0 && (
        <div className="relative w-full h-fit flex overflow-x-scroll justify-start items-start pt-4">
          <div className="relative gap-4 items-center justify-start flex flex-row">
            {commentContent?.images
              ?.map((image) => ({
                type: "image",
                item: image,
              }))
              .map(
                (
                  media: {
                    type: string;
                    item: string;
                  },
                  indexTwo: number
                ) => {
                  return (
                    <div
                      key={indexTwo}
                      className="relative w-40 h-40 rounded-md flex items-center justify-center border border-black"
                    >
                      <MediaSwitch
                        type={"image"}
                        classNameImage={"rounded-md"}
                        classNameAudio={"rounded-md"}
                        classNameVideo={
                          "object-cover w-full h-full flex items-center justify-center rounded-md"
                        }
                        srcUrl={media?.item}
                        hidden
                      />
                      <div
                        className="absolute w-5 h-5 p-px -right-2 -top-2 bg-lightWhite rounded-full cursor-pointer flex items-center justify-center border border-black"
                        onClick={() => {
                          setCommentContent((prev) => ({
                            ...prev,
                            images:
                              media.type === "image"
                                ? prev?.images.filter((_, i) => i !== indexTwo)
                                : prev?.images,
                          }));
                        }}
                      >
                        <ImCross color={"black"} size={8} />
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;

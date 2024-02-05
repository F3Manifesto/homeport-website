import Image from "next/image";
import { FunctionComponent, useRef } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { INFURA_GATEWAY } from "../../../lib/constants";
import { setPostCollect } from "../../../redux/reducers/postCollectSlice";
import { ImCross } from "react-icons/im";
import setPostMedia from "../../../lib/helpers/setPostMedia";
import createProfilePicture from "../../../lib/helpers/createProfilePicture";
import { Profile } from "../../../graphql/generated";
import MediaSwitch from "./MediaSwitch";
import handleSearchProfiles from "../../../lib/helpers/handleSearchProfiles";
import { PostCommentProps } from "../types/collect.types";

const PostComment: FunctionComponent<PostCommentProps> = ({
  commentPost,
  makePostComment,
  setMakePostComment,
  commentPostLoading,
  id,
  height,
  imageHeight,
  imageWidth,
  setContentLoading,
  contentLoading,
  index,
  dispatch,
  postCollect,
  main,
  mentionProfiles,
  profilesOpen,
  setMentionProfiles,
  setProfilesOpen,
  lensConnected,
  caretCoord,
  setCaretCoord,
  width,
}): JSX.Element => {
  const textElement = useRef(null);
  return (
    <div
      className={`relative h-fit flex flex-col items-start justify-start gap-2`}
      style={{
        width,
      }}
    >
      <div
        className="relative w-full p-2 border border-black text-black font-din text-sm bg-lightYellow flex items-center justify-center text-left rounded-md"
        style={{
          height,
        }}
      >
        <textarea
          className="bg-lightYellow relative w-full text-xs h-full p-1 flex"
          style={{ resize: "none" }}
          value={makePostComment?.content}
          onChange={(e) => {
            setMakePostComment((prev) => {
              const arr = [...prev];
              arr[index] = {
                ...arr[index],
                content: e.target.value,
              };
              return arr;
            });
            handleSearchProfiles(
              e,
              setProfilesOpen,
              setMentionProfiles,
              index,
              lensConnected,
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
            {mentionProfiles?.map((user: Profile, indexTwo: number) => {
              const profileImage = createProfilePicture(
                user?.metadata?.picture
              );
              return (
                <div
                  key={indexTwo}
                  className={`relative border-y border-black w-full h-10 px-3 py-2 bg-lightWhite flex flex-row gap-3 cursor-pointer items-center justify-center`}
                  onClick={() => {
                    setProfilesOpen((prev) => {
                      const arr = [...prev];
                      arr[index] = false;
                      return arr;
                    });

                    setMakePostComment((prev) => {
                      const arr = [...prev];
                      arr[index] = {
                        ...arr[index],
                        content:
                          makePostComment?.content?.substring(
                            0,
                            makePostComment?.content?.lastIndexOf("@")
                          ) + `${user?.handle?.suggestedFormatted?.localName}`,
                      };
                      return arr;
                    });
                  }}
                >
                  <div className="relative flex flex-row w-full h-full text-black font-din items-center justify-center gap-2">
                    <div
                      className={`relative rounded-full flex bg-lightYellow border border-black w-3 h-3 items-center justify-center`}
                    >
                      {profileImage && (
                        <Image
                          src={profileImage}
                          objectFit="cover"
                          alt="pfp"
                          layout="fill"
                          className="relative w-fit h-fit rounded-full items-center justify-center flex"
                          draggable={false}
                        />
                      )}
                    </div>
                    <div className="relative items-center justify-center w-fit h-fit text-xxs flex">
                      {user?.handle?.suggestedFormatted?.localName}
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
          {[
            ["QmXzLW1oUhtvBkd6GdTM1bHxqz9cSRw2UCCyT4u6FZ1QCr", "image"],
            ["QmdYmp9Xn7rnvke97jKMJiSdbR9uNpTk7BUchecTbkuSSe", "video"],
            [
              "QmY6bapfAe18pFXk2RuX9mHBA7JN9scLT87H23uqENanLP",
              "collect options",
            ],
            ["", "image"],
          ].map((image: string[], indexTwo: number) => {
            const loaders = [contentLoading?.image, contentLoading?.video];
            return loaders[indexTwo] ? (
              <div
                key={indexTwo}
                className={`relative flex items-center justify-center  ${
                  loaders[indexTwo] && "animate-spin"
                }`}
                title={image[1]}
                style={{
                  height: imageHeight,
                  width: imageWidth,
                }}
              >
                <AiOutlineLoading size={15} color={"white"} />
              </div>
            ) : indexTwo !== 2 && indexTwo !== 3 ? (
              <label
                key={indexTwo}
                className={`relative flex items-center justify-center cursor-pointer active:scale-95`}
                title={image[1]}
                style={{
                  height: imageHeight,
                  width: imageWidth,
                }}
              >
                {
                  <Image
                    layout="fill"
                    src={`${INFURA_GATEWAY}/ipfs/${image[0]}`}
                    draggable={false}
                  />
                }
                <input
                  hidden
                  type="file"
                  accept={indexTwo === 0 ? "image/png, image/gif" : "video/mp4"}
                  multiple={true}
                  onChange={(e) =>
                    e?.target?.files?.[0] &&
                    setPostMedia(
                      e,
                      image[1],
                      setMakePostComment,
                      setContentLoading,
                      index
                    )
                  }
                />
              </label>
            ) : (
              <div
                key={indexTwo}
                className={`relative flex items-center justify-center cursor-pointer active:scale-95`}
                title={image[1]}
                style={{
                  height: imageHeight,
                  width: imageWidth,
                }}
                onClick={() =>
                  dispatch(
                    setPostCollect({
                      actionId: id,
                      actionCollectTypes: postCollect?.collectTypes,
                    })
                  )
                }
              >
                <Image
                  layout="fill"
                  src={`${INFURA_GATEWAY}/ipfs/${image[0]}`}
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
        <div className="relative w-full sm:w-fit h-fit items-center justify-end flex">
          <div
            className={`relative w-20 h-8 font-din text-black flex items-center justify-center bg-lightYellow border border-black text-xs rounded-sm ${
              !commentPostLoading && "cursor-pointer active:scale-95"
            }`}
            onClick={() =>
              !commentPostLoading &&
              (main
                ? (
                    commentPost as (id: string, main: boolean) => Promise<void>
                  )(id, main)
                : (commentPost as (id: string) => Promise<void>)!(id))
            }
          >
            <div
              className={`${
                commentPostLoading && "animate-spin"
              } relative w-fit h-fit flex items-center justify-center text-center`}
            >
              {commentPostLoading ? (
                <AiOutlineLoading size={15} color="black" />
              ) : (
                "Send It"
              )}
            </div>
          </div>
        </div>
      </div>
      {(makePostComment?.images?.length > 0 ||
        makePostComment?.videos?.length > 0) && (
        <div className="relative w-full h-fit flex overflow-x-scroll justify-start items-start pt-4">
          <div className="relative gap-4 items-center justify-start flex flex-row">
            {[
              ...makePostComment?.videos?.map((video) => ({
                type: "video",
                item: video,
              })),
              ...makePostComment?.images?.map((image) => ({
                type: "image",
                item: image,
              })),
            ].map(
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
                      type={media.type !== "video" ? "image" : "video"}
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
                        setMakePostComment((prev) => {
                          const arr = [...prev];
                          arr[index] = {
                            ...arr[index],
                            images:
                              media.type === "image"
                                ? (arr[index]?.images ?? []).filter(
                                    (_, i) => i !== indexTwo
                                  )
                                : arr[index]?.images,
                            videos:
                              media.type === "video"
                                ? (arr[index]?.videos ?? []).filter(
                                    (_, i) => i !== indexTwo
                                  )
                                : arr[index]?.videos,
                          };
                          return arr;
                        });
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

export default PostComment;

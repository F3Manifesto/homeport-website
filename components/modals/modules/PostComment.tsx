import Image from "next/image";
import { FunctionComponent } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { INFURA_GATEWAY } from "../../../lib/constants";
import { setPostCollect } from "../../../redux/reducers/postCollectSlice";
import { ImCross } from "react-icons/im";
import { PostCommentProps } from "../../../types/general.types";
import setPostMedia from "../../../lib/helpers/setPostMedia";

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
}): JSX.Element => {
  return (
    <div className="relative w-full h-fit flex flex-col items-start justify-start gap-2 cursor-empireA">
      <div
        className="relative w-full p-2 border border-offBlack text-black font-din text-sm bg-lightYellow flex items-center justify-center text-left rounded-md"
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
          }}
        ></textarea>
      </div>
      <div className="relative w-full h-fit flex flex-col sm:flex-row items-between justify-center sm:items-center sm:justify-between sm:gap-1.5 gap-4">
        <div className="relative w-full sm:w-fit h-fit items-center justify-start flex flex-row gap-2">
          {[
            ["QmXzLW1oUhtvBkd6GdTM1bHxqz9cSRw2UCCyT4u6FZ1QCr", "image"],
            [
              "QmY6bapfAe18pFXk2RuX9mHBA7JN9scLT87H23uqENanLP",
              "collect options",
            ],
          ].map((image: string[], indexTwo: number) => {
            return contentLoading && image[1] === "image" ? (
              <div
                key={indexTwo}
                className={`relative flex items-center justify-center  ${
                  contentLoading && "animate-spin"
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
                className={`relative flex items-center justify-center cursor-empireS active:scale-95`}
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
                className={`relative flex items-center justify-center cursor-empireS active:scale-95`}
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
            className={`relative w-20 h-8 font-din text-white flex items-center justify-center bg-fuego border border-white text-xs rounded-sm ${
              !commentPostLoading && "cursor-empireS active:scale-95"
            }`}
            onClick={() => !commentPostLoading && commentPost(id, main)}
          >
            <div
              className={`${
                commentPostLoading && "animate-spin"
              } relative w-fit h-fit flex items-center justify-center text-center`}
            >
              {commentPostLoading ? (
                <AiOutlineLoading size={15} color="white" />
              ) : (
                "Send It"
              )}
            </div>
          </div>
        </div>
      </div>
      {makePostComment?.images?.length > 0 && (
        <div className="relative w-full h-fit flex overflow-x-scroll justify-start items-start pt-4">
          <div className="relative gap-4 items-center justify-start flex flex-row">
            {makePostComment?.images?.map((media: string, indexTwo: number) => {
              return (
                <div
                  key={indexTwo}
                  className="relative w-40 h-40 rounded-md flex items-center justify-center border border-white"
                >
                  {media && (
                    <Image
                      className="relative w-full h-full rounded-md"
                      src={media}
                      draggable={false}
                    />
                  )}

                  <div
                    className="absolute w-5 h-5 bg-black p-px -right-2 -top-2 bg-black rounded-full cursor-empireS flex items-center justify-center border border-white"
                    onClick={() => {
                      setMakePostComment((prev) => {
                        const arr = [...prev];
                        arr[index] = {
                          ...arr[index],
                          images: arr[index]?.images,
                        };
                        return arr;
                      });
                    }}
                  >
                    <ImCross color={"white"} size={8} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostComment;

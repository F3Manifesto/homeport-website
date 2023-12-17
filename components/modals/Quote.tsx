import { FunctionComponent } from "react";
import { setQuoteBox } from "../../redux/reducers/quoteBoxSlice";
import { ImCross } from "react-icons/im";
import { QuoteProps } from "../../types/general.types";
import PostComment from "./modules/PostComment";
import PostQuote from "./modules/PostQuote";

const Quote: FunctionComponent<QuoteProps> = ({
  dispatch,
  router,
  commentPost,
  contentLoading,
  setContentLoading,
  postCollect,
  setMakePostComment,
  makePostComment,
  commentPostLoading,
  quote,
}): JSX.Element => {
  return (
    <div className="inset-0 justify-center fixed z-50 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto">
      <div className="relative w-[90vw] sm:w-[70vw] half:w-[40vw] h-fit max-h-[90vh] min-h-[27vh] place-self-center bg-lightWhite border border-black overflow-y-scroll cursor-empireA">
        <div className="relative w-full h-full flex flex-col gap-3 p-2 items-start justify-center">
          <div className="relative w-fit h-fit items-end justify-end ml-auto cursor-empireS flex">
            <ImCross
              color="black"
              size={10}
              onClick={() =>
                dispatch(
                  setQuoteBox({
                    actionOpen: false,
                  })
                )
              }
            />
          </div>
          <PostQuote router={router} quote={quote} />
          <div className="relative w-full h-full flex items-center justify-center pb-3">
            <div className="relative h-full w-4/5 items-center justify-center flex">
              <PostComment
                height="12rem"
                imageHeight="1rem"
                imageWidth="1rem"
                main={false}
                setMakePostComment={setMakePostComment}
                makePostComment={makePostComment?.[0]}
                commentPostLoading={commentPostLoading?.[0]}
                commentPost={commentPost}
                contentLoading={contentLoading?.[0]}
                index={0}
                setContentLoading={setContentLoading}
                dispatch={dispatch}
                postCollect={postCollect}
                id={quote?.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;

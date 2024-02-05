import { FunctionComponent } from "react";
import { setQuoteBox } from "../../../redux/reducers/quoteBoxSlice";
import { ImCross } from "react-icons/im";
import PostComment from "../../Collect/modules/PostComment";
import PostQuote from "../../Collect/modules/PostQuote";
import { Quote } from "../../../graphql/generated";
import { QuoteProps } from "../types/modals.types";

const Quote: FunctionComponent<QuoteProps> = ({
  dispatch,
  quote,
  makePost,
  post,
  setMakePost,
  postLoading,
  setContentLoading,
  contentLoading,
  postCollect,
  lensConnected,
  caretCoord,
  profilesOpen,
  mentionProfiles,
  setMentionProfiles,
  setProfilesOpen,
  setCaretCoord,
}): JSX.Element => {
  return (
    <div className="inset-0 justify-center fixed z-50 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto">
      <div className="relative w-[90vw] sm:w-[70vw] half:w-[40vw] h-fit max-h-[90vh] min-h-[27vh] place-self-center bg-lightWhite border border-black overflow-y-scroll cursor-empireA">
        <div className="relative w-full h-full flex flex-col gap-3 p-2 items-start justify-center">
          <div className="relative w-fit h-fit items-end justify-end ml-auto cursor-pointer flex">
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
          <PostQuote
            disabled={false}
            dispatch={dispatch}
            quote={quote as Quote}
          />
          <div className="relative w-full h-full flex items-center justify-center pb-3">
            <div className="relative h-full w-4/5 items-center justify-center flex">
              <PostComment
                setCaretCoord={setCaretCoord}
                caretCoord={caretCoord}
                profilesOpen={profilesOpen?.[0]}
                mentionProfiles={mentionProfiles}
                setMentionProfiles={setMentionProfiles}
                setProfilesOpen={setProfilesOpen}
                lensConnected={lensConnected}
                main={false}
                setMakePostComment={setMakePost}
                makePostComment={makePost[0]}
                commentPostLoading={postLoading[0]}
                commentPost={post}
                height="25vh"
                imageHeight="1rem"
                imageWidth="1rem"
                contentLoading={contentLoading[0]}
                index={0}
                setContentLoading={setContentLoading}
                dispatch={dispatch}
                postCollect={postCollect}
                id={quote?.id}
                width={"100%"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;

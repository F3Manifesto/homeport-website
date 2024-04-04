import { AnyAction, Dispatch } from "redux";
import { PublicationReactionType } from "../../graphql/generated";
import likePost from "../../graphql/lens/mutations/like";
import handleIndexCheck from "./handleIndexCheck";
import { setIndexer } from "../../redux/reducers/indexerSlice";
import { TFunction } from "i18next";

const lensLike = async (
  id: string,
  dispatch: Dispatch<AnyAction>,
  downvote: boolean,
  t: TFunction<"collect", undefined>
): Promise<void> => {
  const data = await likePost({
    for: id,
    reaction: downvote
      ? PublicationReactionType.Downvote
      : PublicationReactionType.Upvote,
  });
  if (
    data?.data?.addReaction?.__typename === "RelaySuccess" ||
    !data?.data?.addReaction
  ) {
    if (data?.data?.addReaction?.txId) {
      await handleIndexCheck(
        {
          forTxId: data?.data?.addReaction?.txId,
        },
        dispatch,
        t
      );
    } else {
      dispatch(
        setIndexer({
          actionOpen: true,
          actionMessage: t("index"),
        })
      );
      setTimeout(() => {
        dispatch(
          setIndexer({
            actionOpen: false,
            actionMessage: undefined,
          })
        );
      }, 3000);
    }
  }
};

export default lensLike;

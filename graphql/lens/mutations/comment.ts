import { FetchResult } from "@apollo/client";
import { apolloClient } from "../../../lib/lens/client";
import {
  CreateOnchainCommentTypedDataDocument,
  CreateOnchainCommentTypedDataMutation,
  OnchainCommentRequest,
} from "../../generated";

export const commentPost = async (
  request: OnchainCommentRequest
): Promise<FetchResult<CreateOnchainCommentTypedDataMutation>> => {
  return await apolloClient.mutate({
    mutation: CreateOnchainCommentTypedDataDocument,
    variables: {
      request,
    },
  });
};

export default commentPost;

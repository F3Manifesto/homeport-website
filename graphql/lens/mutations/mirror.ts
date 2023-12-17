import { FetchResult } from "@apollo/client";
import { apolloClient } from "../../../lib/lens/client";
import {
  CreateOnchainMirrorTypedDataDocument,
  CreateOnchainMirrorTypedDataMutation,
  OnchainMirrorRequest,
} from "../../generated";

const mirrorPost = async (
  request: OnchainMirrorRequest
): Promise<FetchResult<CreateOnchainMirrorTypedDataMutation>> => {
  return await apolloClient.mutate({
    mutation: CreateOnchainMirrorTypedDataDocument,
    variables: {
      request: request,
    },
  });
};

export default mirrorPost;

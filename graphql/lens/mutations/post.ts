import { FetchResult } from "@apollo/client";
import { apolloClient } from "../../../lib/lens/client";
import {
  CreateOnchainPostTypedDataDocument,
  CreateOnchainPostTypedDataMutation,
  OnchainPostRequest,
} from "../../generated";

const postOnChain = async (
  request: OnchainPostRequest
): Promise<FetchResult<CreateOnchainPostTypedDataMutation>> => {
  return await apolloClient.mutate({
    mutation: CreateOnchainPostTypedDataDocument,
    variables: {
      request,
    },
  });
};
export default postOnChain;

import { FetchResult } from "@apollo/client";
import { apolloClient } from "../../../lib/lens/client";
import {
  CreateOnchainQuoteTypedDataDocument,
  CreateOnchainQuoteTypedDataMutation,
  OnchainQuoteRequest,
} from "../../generated";

const quotePost = async (
  request: OnchainQuoteRequest
): Promise<FetchResult<CreateOnchainQuoteTypedDataMutation>> => {
  return await apolloClient.mutate({
    mutation: CreateOnchainQuoteTypedDataDocument,
    variables: {
      request,
    },
  });
};
export default quotePost;

import { FetchResult } from "@apollo/client";
import {
  CreateUnfollowTypedDataDocument,
  CreateUnfollowTypedDataMutation,
  UnfollowRequest,
} from "../../generated";
import { apolloClient } from "../../../lib/lens/client";

const createUnfollowTypedData = async (
  request: UnfollowRequest
): Promise<FetchResult<CreateUnfollowTypedDataMutation>> => {
  return await apolloClient.mutate({
    mutation: CreateUnfollowTypedDataDocument,
    variables: {
      request,
    },
    fetchPolicy: "no-cache",
  });
};

export default createUnfollowTypedData;

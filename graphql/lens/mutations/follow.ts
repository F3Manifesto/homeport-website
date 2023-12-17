import { FetchResult } from "@apollo/client";
import {
  CreateFollowTypedDataDocument,
  CreateFollowTypedDataMutation,
  FollowRequest,
} from "../../generated";
import { apolloClient } from "../../../lib/lens/client";

const follow = async (
  request: FollowRequest
): Promise<FetchResult<CreateFollowTypedDataMutation>> => {
  return await apolloClient.mutate({
    mutation: CreateFollowTypedDataDocument,
    variables: {
      request,
    },
    fetchPolicy: "no-cache",
  });
};

export default follow;

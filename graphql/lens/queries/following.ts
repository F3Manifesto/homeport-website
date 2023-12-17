import { FetchResult } from "@apollo/client";
import { apolloClient, authClient } from "../../../lib/lens/client";
import {
  FollowingQuery,
  FollowingRequest,
  FollowingDocument,
} from "../../generated";

export const following = async (
  request: FollowingRequest,
  connected: boolean
): Promise<FetchResult<FollowingQuery>> => {
  return await (connected ? apolloClient : authClient).query({
    query: FollowingDocument,
    variables: {
      request: request,
    },
    fetchPolicy: "no-cache",
  });
};
export default following;

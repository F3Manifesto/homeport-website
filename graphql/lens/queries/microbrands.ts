import { FetchResult } from "@apollo/client";
import { authClient, apolloClient } from "../../../lib/lens/client";
import {
  ProfilesRequest,
  ProfilesQuery,
  ProfilesDocument,
} from "../../generated";

export const getMicrobrands = async (
  request: ProfilesRequest,
  connected: boolean
): Promise<FetchResult<ProfilesQuery>> => {
  return await (connected ? apolloClient : authClient).query({
    query: ProfilesDocument,
    variables: {
      request: request,
    },
    fetchPolicy: "no-cache",
  });
};
export default getMicrobrands;

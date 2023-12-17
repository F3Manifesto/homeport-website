import { FetchResult } from "@apollo/client";
import { authClient, apolloClient } from "../../../lib/lens/client";
import {
  ProfilesDocument,
  ProfilesQuery,
  ProfilesRequest,
} from "../../generated";

export const getProfiles = async (
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
export default getProfiles;

import { FetchResult } from "@apollo/client";
import { authClient, apolloClient } from "../../../lib/lens/client";
import {
  ProfileSearchRequest,
  SearchProfilesQuery,
  SearchProfilesDocument,
} from "../../generated";

export const searchProfiles = async (
  request: ProfileSearchRequest,
  connected: boolean
): Promise<FetchResult<SearchProfilesQuery>> => {
  return await (connected ? apolloClient : authClient).query({
    query: SearchProfilesDocument,
    variables: {
      request: request,
    },
    fetchPolicy: "no-cache",
  });
};
export default searchProfiles;

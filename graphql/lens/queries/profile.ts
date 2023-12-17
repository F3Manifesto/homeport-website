import { FetchResult } from "@apollo/client";
import { authClient, apolloClient } from "../../../lib/lens/client";
import { ProfileQuery, ProfileRequest, ProfileDocument } from "../../generated";

export const getProfile = async (
  request: ProfileRequest,
  connected: boolean
): Promise<FetchResult<ProfileQuery>> => {
  return await (connected ? apolloClient : authClient).query({
    query: ProfileDocument,
    variables: {
      request: request,
    },
    fetchPolicy: "no-cache",
  });
};
export default getProfile;

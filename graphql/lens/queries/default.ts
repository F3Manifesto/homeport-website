import { FetchResult } from "@apollo/client";
import { authClient, apolloClient } from "../../../lib/lens/client";
import {
  DefaultProfileDocument,
  DefaultProfileRequest,
  DefaultProfileQuery,
} from "../../generated";

const getDefaultProfile = async (
  request: DefaultProfileRequest,
  connected: boolean
): Promise<FetchResult<DefaultProfileQuery>> => {
  return await (connected ? apolloClient : authClient).query({
    query: DefaultProfileDocument,
    variables: {
      request,
    },
    fetchPolicy: "no-cache",
  });
};

export default getDefaultProfile;

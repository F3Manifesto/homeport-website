import { FetchResult } from "@apollo/client";
import { authClient, apolloClient } from "../../../lib/lens/client";
import {
  WhoActedOnPublicationRequest,
  WhoActedOnPublicationDocument,
  WhoActedOnPublicationQuery,
} from "../../generated";

export const whoActedPublication = async (
  request: WhoActedOnPublicationRequest,
  connected: boolean
): Promise<FetchResult<WhoActedOnPublicationQuery>> => {
  return await (connected ? apolloClient : authClient).query({
    query: WhoActedOnPublicationDocument,
    variables: {
      request: request,
    },
    fetchPolicy: "no-cache",
  });
};
export default whoActedPublication;

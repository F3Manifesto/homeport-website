import { FetchResult } from "@apollo/client";
import { authClient, apolloClient } from "../../../lib/lens/client";
import {
  WhoReactedPublicationDocument,
  WhoReactedPublicationQuery,
  WhoReactedPublicationRequest,
} from "../../generated";

export const whoReactedPublication = async (
  request: WhoReactedPublicationRequest,
  connected: boolean
): Promise<FetchResult<WhoReactedPublicationQuery>> => {
  return await (connected ? apolloClient : authClient).query({
    query: WhoReactedPublicationDocument,
    variables: {
      request: request,
    },
    fetchPolicy: "no-cache",
  });
};
export default whoReactedPublication;

import { FetchResult } from "@apollo/client";
import { authClient, apolloClient } from "../../../lib/lens/client";
import {
  PublicationDocument,
  PublicationQuery,
  PublicationRequest,
} from "../../generated";

export const getPublication = async (
  request: PublicationRequest,
  connected: boolean
): Promise<FetchResult<PublicationQuery>> => {
  return await (connected ? apolloClient : authClient).query({
    query: PublicationDocument,
    variables: {
      request: request,
    },
    fetchPolicy: "no-cache",
  });
};
export default getPublication;

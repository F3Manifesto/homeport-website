import { FetchResult } from "@apollo/client";
import { authClient, apolloClient } from "../../../lib/lens/client";
import {
  SearchPublicationsDocument,
  SearchPublicationsQuery,
  PublicationSearchRequest,
} from "../../generated";

export const searchPubs = async (
  request: PublicationSearchRequest,
  connected: boolean
): Promise<FetchResult<SearchPublicationsQuery>> => {
  return await (connected ? apolloClient : authClient).query({
    query: SearchPublicationsDocument,
    variables: {
      request: request,
    },
    fetchPolicy: "no-cache",
  });
};
export default searchPubs;

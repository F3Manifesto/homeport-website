import { FetchResult } from "@apollo/client";
import { apolloClient } from "../../../lib/lens/client";
import {
  PublicationBookmarksDocument,
  PublicationBookmarksQuery,
  PublicationBookmarksRequest,
} from "../../generated";

export const bookmarks = async (
  request: PublicationBookmarksRequest
): Promise<FetchResult<PublicationBookmarksQuery>> => {
  return await apolloClient.query({
    query: PublicationBookmarksDocument,
    variables: {
      request: request,
    },
    fetchPolicy: "no-cache",
  });
};
export default bookmarks;

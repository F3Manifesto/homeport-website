import { FetchResult } from "@apollo/client";
import { apolloClient } from "../../../lib/lens/client";
import {
  AddPublicationBookmarkDocument,
  AddPublicationBookmarkMutation,
  PublicationBookmarkRequest,
} from "../../generated";

const bookmark = async (
  request: PublicationBookmarkRequest
): Promise<FetchResult<AddPublicationBookmarkMutation>> => {
  return await apolloClient.mutate({
    mutation: AddPublicationBookmarkDocument,
    variables: {
      request: request,
    },
  });
};

export default bookmark;

import { FetchResult } from "@apollo/client";
import { apolloClient } from "../../../lib/lens/client";
import {
  HidePublicationDocument,
  HidePublicationMutation,
  HidePublicationRequest,
} from "../../generated";

const hidePost = async (
  request: HidePublicationRequest
): Promise<FetchResult<HidePublicationMutation>> => {
  return await apolloClient.mutate({
    mutation: HidePublicationDocument,
    variables: {
      request: request,
    },
  });
};

export default hidePost;

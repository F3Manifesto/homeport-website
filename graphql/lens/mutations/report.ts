import { FetchResult } from "@apollo/client";
import { apolloClient } from "../../../lib/lens/client";
import {
  ReportPublicationDocument,
  ReportPublicationMutation,
  ReportPublicationRequest,
} from "../../generated";

const reportPost = async (
  request: ReportPublicationRequest
): Promise<FetchResult<ReportPublicationMutation>> => {
  return await apolloClient.mutate({
    mutation: ReportPublicationDocument,
    variables: {
      request: request,
    },
  });
};

export default reportPost;

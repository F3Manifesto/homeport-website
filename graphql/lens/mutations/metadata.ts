import { FetchResult } from "@apollo/client";
import { apolloClient } from "../../../lib/lens/client";
import {
  CreateOnchainSetProfileMetadataTypedDataDocument,
  CreateOnchainSetProfileMetadataTypedDataMutation,
  OnchainSetProfileMetadataRequest,
} from "../../generated";

const profileMetadata = async (
  request: OnchainSetProfileMetadataRequest
): Promise<FetchResult<CreateOnchainSetProfileMetadataTypedDataMutation>> => {
  return await apolloClient.mutate({
    mutation: CreateOnchainSetProfileMetadataTypedDataDocument,
    variables: {
      request: request,
    },
  });
};

export default profileMetadata;

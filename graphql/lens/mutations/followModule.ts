import { FetchResult } from "@apollo/client";
import { apolloClient } from "../../../lib/lens/client";
import {
  CreateSetFollowModuleTypedDataDocument,
  CreateSetFollowModuleTypedDataMutation,
  SetFollowModuleRequest,
} from "../../generated";

const setFollowModule = async (
  request: SetFollowModuleRequest
): Promise<FetchResult<CreateSetFollowModuleTypedDataMutation>> => {
  return await apolloClient.mutate({
    mutation: CreateSetFollowModuleTypedDataDocument,
    variables: {
      request: request,
    },
  });
};

export default setFollowModule;

import { FetchResult } from "@apollo/client";
import { authClient } from "../../../lib/lens/client";
import {
  CreateProfileWithHandleDocument,
  CreateProfileWithHandleMutation,
  CreateProfileWithHandleRequest,
} from "../../generated";

const createProfile = async (
  request: CreateProfileWithHandleRequest
): Promise<FetchResult<CreateProfileWithHandleMutation>>=> {
  return await authClient.mutate({
    mutation: CreateProfileWithHandleDocument,
    variables: {
      request: request,
    },
  });
};

export default createProfile;

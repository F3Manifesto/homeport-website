import { FetchResult } from "@apollo/client";
import { authClient } from "../../../lib/lens/client";
import {
  RefreshDocument,
  RefreshMutation,
  RefreshRequest,
} from "../../generated";

const refresh = async (
  request: RefreshRequest
): Promise<FetchResult<RefreshMutation>> => {
  return await authClient.mutate({
    mutation: RefreshDocument,
    variables: {
      request: request,
    },
  });
};

export default refresh;

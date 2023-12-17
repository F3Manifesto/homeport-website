import { FetchResult } from "@apollo/client";
import { authClient } from "../../../lib/lens/client";
import {
  AuthenticateDocument,
  AuthenticateMutation,
  SignedAuthChallenge,
} from "../../generated";

const authenticate = async (
  request: SignedAuthChallenge
): Promise<FetchResult<AuthenticateMutation>> => {
  return await authClient.mutate({
    mutation: AuthenticateDocument,
    variables: {
      request: request,
    },
  });
};

export default authenticate;

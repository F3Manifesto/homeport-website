import { FetchResult } from "@apollo/client";
import { apolloClient, authClient } from "../../../lib/lens/client";
import {
  PublicationsDocument,
  PublicationsQuery,
  PublicationsRequest,
} from "../../generated";

export const getPublications = async (
  request: PublicationsRequest,
  connected: boolean
): Promise<FetchResult<PublicationsQuery>> => {
  try {
    return await (connected ? apolloClient : authClient).query({
      query: PublicationsDocument,
      variables: {
        request,
      },
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    });
  } catch (err) {
    return await authClient.query({
      query: PublicationsDocument,
      variables: {
        request,
      },
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    });
  }
};
export default getPublications;

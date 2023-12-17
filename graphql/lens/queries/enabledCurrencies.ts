import { FetchResult } from "@apollo/client";
import {
  EnabledCurrenciesDocument,
  EnabledCurrenciesQuery,
  PaginatedOffsetRequest,
} from "../../generated";
import { authClient } from "../../../lib/lens/client";

const getEnabledCurrencies = async (
  request: PaginatedOffsetRequest
): Promise<FetchResult<EnabledCurrenciesQuery>> => {
  return await authClient.query({
    query: EnabledCurrenciesDocument,
    variables: {
      request,
    },
    fetchPolicy: "no-cache",
  });
};

export default getEnabledCurrencies;

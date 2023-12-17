import { FetchResult } from "@apollo/client";
import { apolloClient } from "../../../lib/lens/client";
import {
  ApprovedModuleAllowanceAmountDocument,
  ApprovedModuleAllowanceAmountQuery,
  ApprovedModuleAllowanceAmountRequest,
} from "../../generated";

const isApprovedData = async (
  request: ApprovedModuleAllowanceAmountRequest
): Promise<FetchResult<ApprovedModuleAllowanceAmountQuery>> => {
  return await apolloClient.mutate({
    mutation: ApprovedModuleAllowanceAmountDocument,
    variables: {
      request,
    },
  });
};

export default isApprovedData;

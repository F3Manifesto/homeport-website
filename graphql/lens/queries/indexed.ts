import { FetchResult } from "@apollo/client";
import { apolloClient } from "../../../lib/lens/client";
import {
  LensTransactionStatusRequest,
  LensTransactionStatusQuery,
  LensTransactionStatusDocument,
  LensTransactionStatusType,
} from "../../generated";
import { AnyAction, Dispatch } from "redux";
import { setIndexer } from "../../../redux/reducers/indexerSlice";
import { setInteractError } from "../../../redux/reducers/interactErrorSlice";

const handleIndexCheck = async (
  tx: LensTransactionStatusRequest,
  dispatch: Dispatch<AnyAction>
) => {
  const indexedStatus = await pollUntilIndexed(tx);
  if (indexedStatus) {
    dispatch(
      setIndexer({
        actionOpen: true,
        actionMessage: "Successfully Indexed",
      })
    );
  } else {
    dispatch(setInteractError(true));
  }

  const timeoutId = setTimeout(() => {
    dispatch(
      setIndexer({
        actionOpen: false,
        actionMessage: undefined,
      })
    );
  }, 3000);

  return () => clearTimeout(timeoutId);
};

export const getIndexed = async (
  request: LensTransactionStatusRequest
): Promise<FetchResult<LensTransactionStatusQuery>> => {
  return await apolloClient.query({
    query: LensTransactionStatusDocument,
    variables: {
      request: request,
    },
    fetchPolicy: "no-cache",
  });
};

const pollUntilIndexed = async (
  request: LensTransactionStatusRequest
): Promise<boolean> => {
  let count = 0;
  while (count < 10) {
    try {
      const { data } = await getIndexed(request);
      if (data && data.lensTransactionStatus) {
        switch (data.lensTransactionStatus.status) {
          case LensTransactionStatusType.Failed:
            return false;
          case LensTransactionStatusType.OptimisticallyUpdated:
          case LensTransactionStatusType.Complete:
            return true;
          case LensTransactionStatusType.Processing:
            count += 1;
            await new Promise((resolve) => setTimeout(resolve, 6000));
            if (count == 10) return true;
            break;
          default:
            throw new Error("Unexpected status");
        }
      }
    } catch (err: any) {
      count += 1;
      console.error(err.message);
      continue;
    }
  }
  return false;
};

export default handleIndexCheck;

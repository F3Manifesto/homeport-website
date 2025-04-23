import { graphF3MClient } from "@/app/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const ORACLE = `
  query {
    currencyAddeds {
        currency
        rate
        wei
      }
  }
`;

export const getOracleData = async (): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = graphF3MClient.query({
    query: gql(ORACLE),
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  });

  const timeoutPromise = new Promise((resolve) => {
    timeoutId = setTimeout(() => {
      resolve({ timedOut: true });
    }, 60000); // 1 minute timeout
  });

  const result: any = await Promise.race([queryPromise, timeoutPromise]);
  timeoutId && clearTimeout(timeoutId);
  if (result.timedOut) {
    return;
  } else {
    return result;
  }
};

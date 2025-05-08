import { graphF3MClient } from "@/app/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const ORDERS = `
  query($buyer: String!) {
    orderCreateds(where: { buyer: $buyer }) {
      amount
      messages
      orderId
      collection {
        collectionId
        metadata {
          images
          title
        }
        postId
      }
      isFulfilled
      buyer
      currency
      details
      status
      totalPrice
      blockTimestamp
      transactionHash
    }
  }
`;

export const getOrders = async (buyer: string): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = graphF3MClient.query({
    query: gql(ORDERS),
    variables: {buyer},
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

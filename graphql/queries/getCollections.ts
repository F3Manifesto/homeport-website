import { graphF3MClient } from "@/app/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const COLLECTIONS = `
  query($title: String!) {
    collectionCreateds(where: {collectionMetadata_: { title_contains_nocase: $title }},first: 1) {
      amount
      uri
      drop {
        uri 
        dropMetadata {
          cover
          title
        }
      }
      collectionMetadata {
        access
        visibility
        style
        sex
        title
        extra
        tags
        prompt
        description
        images
      }
      postId
      acceptedTokens
      price
      mintedTokenIds
      collectionId
      blockTimestamp
    }
  }
`;

const ALL_COLLECTIONS = `
  query($first: Int, $skip: Int) {
    collectionCreateds(first: $first, skip: $skip) {
      amount
      uri
      drop {
        uri
        dropMetadata {
          cover
          title
        }
      }
      collectionMetadata {
        access
        visibility
        style
        sex
        title
        tags
        extra
        prompt
        description
        images
      }
      postId
      acceptedTokens
      price
      mintedTokenIds
      collectionId
    }
  }
`;

export const getOneCollection = async (
  title: string
): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = graphF3MClient.query({
    query: gql(COLLECTIONS),
    variables: {
      title,
    },
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  });

  const timeoutPromise = new Promise((resolve) => {
    timeoutId = setTimeout(() => {
      resolve({ timedOut: true });
    }, 60000);
  });

  const result: any = await Promise.race([queryPromise, timeoutPromise]);
  timeoutId && clearTimeout(timeoutId);
  if (result.timedOut) {
    return;
  } else {
    return result;
  }
};

export const getAllCollections = async (
  first: number,
  skip: number
): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = graphF3MClient.query({
    query: gql(ALL_COLLECTIONS),
    variables: {
      first,
      skip,
    },
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  });

  const timeoutPromise = new Promise((resolve) => {
    timeoutId = setTimeout(() => {
      resolve({ timedOut: true });
    }, 60000);
  });

  const result: any = await Promise.race([queryPromise, timeoutPromise]);
  timeoutId && clearTimeout(timeoutId);
  if (result.timedOut) {
    return;
  } else {
    return result;
  }
};

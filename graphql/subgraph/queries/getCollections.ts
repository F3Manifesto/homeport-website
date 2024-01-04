import { FetchResult, gql } from "@apollo/client";
import { graphPrintClient } from "../../../lib/graph/client";

const COLLECTIONS = `
  query($title: String!, $origin: String!) {
    collectionCreateds(where: {
      and: [
        { origin: $origin },
        { collectionMetadata_: { title_starts_with_nocase: $title } },
        { collectionMetadata_: { title_ends_with_nocase: $title } },
      ]
    },first: 1) {
      amount
      uri
      dropMetadata {
        dropCover
        dropTitle
      }
      collectionMetadata {
        access
        visibility
        style
        sex
        title
        tags
        prompt
        description
        images
      }
      pubId
      profileId
      acceptedTokens
      prices
      collectionId
      soldTokens
      blockTimestamp
    }
  }
`;

const ALL_COLLECTIONS = `
  query($origin: String!, $first: Int, $skip: Int) {
    collectionCreateds(where: {origin: $origin}, first: $first, skip: $skip) {
      amount
      uri
      dropMetadata {
        dropCover
        dropTitle
      }
      collectionMetadata {
        access
        visibility
        style
        sex
        title
        tags
        prompt
        description
        images
      }
      pubId
      profileId
      acceptedTokens
      prices
      collectionId
      soldTokens
    }
  }
`;

export const getOneCollection = async (
  title: string
): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = graphPrintClient.query({
    query: gql(COLLECTIONS),
    variables: {
      title,
      origin: "4",
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
  const queryPromise = graphPrintClient.query({
    query: gql(ALL_COLLECTIONS),
    variables: {
      origin: "4",
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

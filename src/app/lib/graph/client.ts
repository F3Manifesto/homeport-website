import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const getF3MUri = () => {
  if (typeof window === "undefined") {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    return `${baseUrl}/api/graphql/print`;
  }
  return "/api/graphql/print";
};

const f3mLinkPrint = new HttpLink({
  uri: getF3MUri(),
});

export const graphF3MClient = new ApolloClient({
  link: f3mLinkPrint,
  cache: new InMemoryCache(),
});

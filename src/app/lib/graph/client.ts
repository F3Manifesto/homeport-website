import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const f3mLinkPrint = new HttpLink({
  uri: `https://gateway.thegraph.com/api/${process.env.NEXT_PUBLIC_GRAPH_KEY}/subgraphs/id/5BRsShsfv6tEucvDwGtrstRhg1fpvx2pMRWh5GDovE9K`,
});

export const graphF3MClient = new ApolloClient({
  link: f3mLinkPrint,
  cache: new InMemoryCache(),
});

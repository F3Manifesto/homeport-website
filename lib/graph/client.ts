import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLinkPrint = new HttpLink({
  uri: `https://gateway-arbitrum.network.thegraph.com/api/${process.env.NEXT_PUBLIC_GRAPH_KEY}/subgraphs/id/DcuUkg3QC5zg1t86VeNjWzg6R6ohaGa8QGyVE1rFYMZB`,
});

export const graphPrintClient = new ApolloClient({
  link: httpLinkPrint,
  cache: new InMemoryCache(),
});

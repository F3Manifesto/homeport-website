import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const f3mLinkPrint = new HttpLink({
  uri: `https://gateway.thegraph.com/api/${process.env.NEXT_PUBLIC_GRAPH_KEY}/subgraphs/id/AtMM6ryuKg8Hh1bx7xR3Do7oHUEzByWDpLxi7nDU1Yyu
`,
});

export const graphF3MClient = new ApolloClient({
  link: f3mLinkPrint,
  cache: new InMemoryCache(),
});

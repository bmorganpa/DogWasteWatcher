import { ApolloServer } from "apollo-server-micro";

import { createContext as context } from "../../apollo/context";
import { schema } from "../../apollo/schema";

const apolloServer = new ApolloServer({ context, schema });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });

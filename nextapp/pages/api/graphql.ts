import { ApolloServer, AuthenticationError as ApolloAuthenticationError, ForbiddenError as ApolloForbiddenError } from "apollo-server-micro";

import { AuthenticationError, AuthorizationError } from "../../apollo/model/error";
import { createContext as context } from "../../apollo/context";
import { schema } from "../../apollo/schema";

const apolloServer = new ApolloServer({
  context, schema, formatError: (error) => {
    if (error.originalError instanceof AuthenticationError) {
      return new ApolloAuthenticationError(error.message);
    }
    if (error.originalError instanceof AuthorizationError) {
      return new ApolloForbiddenError(error.message);
    }
    return error;
  }});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });

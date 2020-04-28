import {
  ApolloServer,
  AuthenticationError as ApolloAuthenticationError,
  ForbiddenError as ApolloForbiddenError,
  UserInputError as ApolloUserInputError,
} from "apollo-server-micro";

import {
  AuthenticationError,
  AuthorizationError,
  BadRequestError,
} from "../../apollo/model/error";
import { cleanupContext } from "../../apollo/context";
import { createContext as context } from "../../apollo/context";
import { schema } from "../../apollo/schema";

const apolloServer = new ApolloServer({
  context,
  schema,
  formatError: (error) => {
    if (error.originalError instanceof AuthenticationError) {
      return new ApolloAuthenticationError(error.message);
    }
    if (error.originalError instanceof AuthorizationError) {
      return new ApolloForbiddenError(error.message);
    }
    if (error.originalError instanceof BadRequestError) {
      return new ApolloUserInputError(
        error.message,
        error.originalError.properties,
      );
    }
    return error;
  },
  plugins: [
    {
      requestDidStart() {
        return {
          willSendResponse(requestContext) {
            cleanupContext(requestContext.context as any);
          },
        };
      },
    },
  ],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });

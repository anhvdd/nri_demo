import config from "./config/environment/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/schema/index";
import resolvers from "./graphql/resolvers/index";
import loggingMiddleware from "./common/middlewares/logging.middleware";
const app = express();

const port = config.port;

async function startServer() {
  const middleware = [loggingMiddleware.logInput, loggingMiddleware.logResult];
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    // formatError: (formattedError: any, error: any) => {
    //   return formattedError;
    // },
  });
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
}
startServer();

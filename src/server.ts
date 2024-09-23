import config from "./config/environment/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/schema/index";
import resolvers from "./graphql/resolvers/index";
import logger from "./common/logging/logging";
import BasicLogging from "./common/logging/logging2";
const app = express();

const port = config.port;

async function startServer() {
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    plugins: [],
    
    context: async ({ req }) => {
      logger.log(req.body);
    },
    formatError: (error: any) => {
      return {
        message: error.message,
        code: error.code,
        status: error.status,
      };
    },
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

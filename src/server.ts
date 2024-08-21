import config from "./config/environment/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/schema/index";
import resolvers from "./graphql/resolvers/index";

const app = express();

const port = config.port;

async function startServer() {
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
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

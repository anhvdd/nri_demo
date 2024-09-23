import { GraphQLError } from "graphql";
const customError = new GraphQLError("Custom error", {
  extensions: { code: "custom", date: Date.now(), status: 400 },
});

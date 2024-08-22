import { GraphQLError } from "graphql";

throw new GraphQLError("Custom error", { extensions: { code: "custom" } });

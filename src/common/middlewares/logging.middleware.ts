import { GraphQLResolveInfo } from "graphql";
import { AppContext } from "../interfaces/AppContext";

const loggingMiddleware = async (
  resolve: Function,
  parents: any,
  args: any,
  context: AppContext,
  info: GraphQLResolveInfo
) => {
  console.log(`Input arguments: ${JSON.stringify(args)}`);
  const result = await resolve(parents, args, context, info);
  console.log(`Result: ${JSON.stringify(result)}`);
  return result;
};

const logInput = async (
  resolve: any,
  root: any,
  args: any,
  context: any,
  info: any
) => {
  console.log(`1. logInput: ${JSON.stringify(args)}`);
  const result = await resolve(root, args, context, info);
  console.log(`5. logInput`);
  return result;
};

const logResult = async (
  resolve: any,
  root: any,
  args: any,
  context: any,
  info: any
) => {
  console.log(`2. logResult`);
  const result = await resolve(root, args, context, info);
  console.log(`4. logResult: ${JSON.stringify(result)}`);
  return result;
};

export default { loggingMiddleware, logInput, logResult };

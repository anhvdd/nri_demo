import { GraphQLError } from "graphql";

class BaseException extends GraphQLError {
  status: number;
  message: string;
  extensions: {};

  constructor(status: number, message: string, code?: string) {
    super(message);
    this.message = message;
    this.extensions = { code: code, status: status };
  }
}

export default BaseException;

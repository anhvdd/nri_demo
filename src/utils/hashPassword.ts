import { hash, verify } from "argon2";
import jsonwebtoken from "jsonwebtoken";

export const hashPassword = async (password) => {
  return await hash(password);
};

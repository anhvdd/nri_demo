import { gql } from "apollo-server-express";

const UserSchema = gql`
  type User {
    id: ID!
    name: String
    email: String
    password: String
    address: Address
  }

  input UserInput {
    name: String
    email: String
    password: String
  }

  input Pagination {
    page: Int
    limit: Int
    offset: Int
    sortBy: String
    sortOrder: String
    search: String
  }

  type Query {
    findUsers(input: Pagination): [User]
    findUser(id: ID!): User
  }

  type Mutation {
    createUser(input: UserInput): User
    editUser(id: ID!, input: UserInput): User
    deleteUser(id: ID!): User
  }

  type Subscription {
    newUser(id: ID): User
    editUser(id: ID): User
    deleteUser(id: ID): User
  }

  type UserBaseResponse {
    code: String
    success: Boolean
    data: User
  }
`;
export default UserSchema;

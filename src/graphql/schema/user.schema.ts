import { gql } from "apollo-server-express";

const UserSchema = gql`
  type User {
    id: ID!
    name: String
    email: String
    password: String
    address: Address
  }

  type Query {
    findUsers(input: PaginationRequest): UsersResponse
    findUserWithCursor(input: PaginationRequest): UsersResponse
    findUser(id: ID!): UserResponse
  }

  type Mutation {
    createUser(input: UserInput): UserResponse
    editUser(id: ID!, input: UserInput): UserResponse
    deleteUser(id: ID!): UserResponse
  }

  type Subscription {
    newUser(id: ID): User
    editUser(id: ID): User
    deleteUser(id: ID): User
  }

  input UserInput {
    name: String
    email: String
    password: String
    addressId: ID
  }

  type UserResponse implements BaseResponse {
    success: Boolean!
    message: String
    item: User
  }

  type UsersResponse implements BaseResponse & PaginationOffsetResInfo & PaginationCursorResInfo {
    success: Boolean!
    message: String
    items: [User]

    page: Int
    limit: Int
    total: Int
    totalPages: Int

    startCursor: Int
    endCursor: Int
  }
`;
export default UserSchema;

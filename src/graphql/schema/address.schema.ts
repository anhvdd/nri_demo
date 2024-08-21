import { gql } from "apollo-server-express";

const AddressSchema = gql`
  type Address {
    id: ID!
    addressDescription: String
    user: [User]
  }

  input AddressInput {
    addressDescription: String
    userId: ID
  }

  type Query {
    findAddresses: [Address]
    findAddress(id: ID!): Address
    address(id: ID!): Address
  }

  type Mutation {
    createAddress(input: AddressInput): Address
    editAddress(id: ID!, input: AddressInput): Address
    deleteAddress(id: ID!): User
  }
`;
export default AddressSchema;

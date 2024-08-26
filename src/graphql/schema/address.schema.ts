import { gql } from "apollo-server-express";

const AddressSchema = gql`
  type Address {
    id: ID!
    addressDescription: String
    user: [User]
  }

  type Query {
    findAddresses(input: PaginationRequest): AddressesResponse
    findAddress(id: ID!): AddressResponse
  }

  type Mutation {
    createAddress(input: AddressInput): AddressResponse
    editAddress(id: ID!, input: AddressInput): AddressResponse
    deleteAddress(id: ID!): AddressResponse
  }

  input AddressInput {
    addressDescription: String
  }

  type AddressResponse implements BaseResponse {
    success: Boolean!
    message: String
    item: Address
  }

  type AddressesResponse implements BaseResponse {
    success: Boolean!
    message: String
    items: [Address]
    pagination: PaginationResponse
  }
`;
export default AddressSchema;

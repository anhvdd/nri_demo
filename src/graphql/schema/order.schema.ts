import { gql } from "apollo-server-express";

const OrderSchema = gql`
  type Order {
    id: ID!
    user: User
    address: Address
    products: [Product]
  }
`;

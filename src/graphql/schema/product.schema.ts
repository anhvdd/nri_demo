import { gql } from "apollo-server-express";

const ProductSchema = gql`
  type Product {
    id: ID!
    name: String
    description: String
    price: Float
    image: String
  }
`;
export default ProductSchema;

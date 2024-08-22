import { gql } from "apollo-server-express";

const BaseSchema = gql`
  input Pagination {
    page: Int
    limit: Int
    offset: Int
    sortBy: String
    sortOrder: String
    search: String
  }
`;

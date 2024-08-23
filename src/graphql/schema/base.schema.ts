import { gql } from "apollo-server-express";

export const BaseSchema = gql`
  input Pagination {
    page: Int
    limit: Int
    sortBy: String
    sortOrder: String
    search: String
  }

  interface BaseResponse {
    success: Boolean!
    message: String
  }
  interface ErrorBaseResponse {
    error: [String]
    message: String
  }

  type PaginationInfo {
    page: Int
    limit: Int
    total: Int
    totalPages: Int
  }
`;

import { gql } from "apollo-server-express";

export const BaseSchema = gql`
  input PaginationRequest {
    page: Int
    limit: Int
    sortBy: String
    sortOrder: String
    search: String
    cursor: String
    direction: String
  }

  interface BaseResponse {
    success: Boolean!
    message: String
  }

  interface ErrorBaseResponse {
    error: [String]
    message: String
  }

  interface PaginationOffsetResInfo {
    page: Int
    limit: Int
    total: Int
    totalPages: Int
  }

  interface PaginationCursorResInfo {
    limit: Int
    startCursor: Int
    endCursor: Int
  }

  type PaginationResponse {
    page: Int
    limit: Int
    total: Int
    totalPages: Int

    # for cursor based
    startCursor: Int
    endCursor: Int
  }

  type PageInfo {
    currentPage: Int
    perPage: Int
    itemCount: Int
    pageCount: Int
    hasPreviousPage: Boolean
    hasNextPage: Boolean
  }

  type GraphQLError {
    message: String
    error: [String]
  }
`;

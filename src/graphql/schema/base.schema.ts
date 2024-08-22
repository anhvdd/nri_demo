import { gql } from "apollo-server-express";

const BaseSchema = gql`
  input Pagination {
    page: Int @defaultValue(1)
    limit: Int @defaultValue(10)
    offset: Int @defaultValue(0)
    sortBy: String @defaultValue()
    sortOrder: String
    search: String
  }

  # type Bna 
`;

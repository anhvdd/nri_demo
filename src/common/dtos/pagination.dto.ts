export class PaginationDto {
  // for offset pagination
  limit: number = 10;
  page: number = 1;

  // for cursor pagination
  cursor?: string;
  // endCursor?: string;
  direction?: Direction = Direction.AFTER;

  sortBy?: string;
  sortOrder?: string;
  search?: string;
}
export enum Direction {
  AFTER = "after",
  BEFORE = "before",
}

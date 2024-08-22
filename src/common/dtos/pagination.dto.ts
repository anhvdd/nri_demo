export class PaginationDto {
  limit: number = 10;
  offset: number = 0;
  page: number = 1;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}

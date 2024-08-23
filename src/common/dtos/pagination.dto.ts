export class PaginationDto {
  limit: number = 10;
  page: number = 1;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}

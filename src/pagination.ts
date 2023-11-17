// pagination.ts

import { Repository } from 'typeorm';

interface PaginatedResult<T> {
  page: number;
  per_page: number;
  total: number;
  data: T[];
}

export const paginate = async <T>(
  repository: Repository<T>,
  page: number,
  perPage: number,
  whereClause?: object,
): Promise<PaginatedResult<T>> => {
  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;

  const data = await repository.find({
    where: whereClause || {},
    skip: startIndex,
    take: perPage,
  });

  const total = await repository.count({
    where: whereClause || {},
  });

  return {
    page,
    per_page: perPage,
    total,
    data,
  };
};
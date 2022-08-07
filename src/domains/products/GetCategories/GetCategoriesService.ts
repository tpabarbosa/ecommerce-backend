import { GetCategoriesDTO } from '.';
import BaseService from '../../../baseClasses/BaseService';
import DatabaseError from '../../../middlewares/errorHandling/errors/DatabaseError';

import Category from '../entities/Category';

export default class GetCategoriesService extends BaseService<
  [Category],
  GetCategoriesDTO
> {
  public async executer(): Promise<Category[]> {
    try {
      const categories = await this.repository.category.find({
        select: ['id', 'name', 'slug'],
      });

      return categories;
    } catch (error) {
      throw new DatabaseError(
        'Some error occurred while trying to retrieve categories',
        error
      );
    }
  }
}

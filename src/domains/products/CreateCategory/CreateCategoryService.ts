import slugify from 'slugify';
import Category from '../entities/Category';

import { CreateCategoryDTO } from '.';
import CategoryAlreadyExists from '../errors/CategoryAlreadyExists';
import BaseService from '../../../baseClasses/BaseService';

export default class CreateCategoryService extends BaseService<
  [Category],
  CreateCategoryDTO
> {
  public async executer(data: CreateCategoryDTO): Promise<Category> {
    const hasCategory = await this.repository.category.findOneBy({
      name: data.category.name,
    });

    if (hasCategory) {
      throw new CategoryAlreadyExists();
    }

    const slug = slugify(data.category.name, {
      lower: true,
      strict: true,
      trim: true,
    });

    const category = this.repository.category.create({
      ...data.category,
      slug,
    });

    await this.repository.category.save(category);

    return category;
  }
}

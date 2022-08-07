import ProductToCategory from '../entities/ProductToCategory';

import { GetCategoryProductsDTO } from '.';

import CategoryNotFound from '../errors/CategoryNotFound';
import Category from '../entities/Category';

import BaseService from '../../../baseClasses/BaseService';
import PaginationHelper, {
  PaginationReturn,
} from '../../../helpers/PaginationHelper';
import ProductNotFound from '../errors/ProductNotFound';

export type GetCategoryProductsServiceReturn = PaginationReturn & {
  products: ProductToCategory[];
  category: Category;
};

export default class GetCategoryProductsService extends BaseService<
  [ProductToCategory, Category],
  GetCategoryProductsDTO
> {
  public async executer(
    data: GetCategoryProductsDTO
  ): Promise<GetCategoryProductsServiceReturn> {
    let where = {};
    let category: Category;
    if (data.id) {
      category = (await this.repository.category.findOne({
        select: { id: true, name: true },
        where: { id: data.id },
      })) as Category;

      where = { category_id: data.id };
    } else {
      category = (await this.repository.category.findOne({
        select: { id: true, name: true },
        where: { slug: data.slug },
      })) as Category;

      where = { category_id: category.id };
    }

    if (!category) {
      throw new CategoryNotFound();
    }

    const [products, count] =
      await this.repository.categoryProducts.findAndCount({
        ...PaginationHelper.find(data),
        // select: { id: true, product_id: true },
        where,
        relations: {
          product: {
            sizes: true,
            sale: true,
            photos: true,
          },
        },
      });

    if (!products) {
      throw new ProductNotFound();
    }

    return {
      count,
      products: products as ProductToCategory[],
      category,
    };
  }
}

import { GetProductsDTO } from '.';
import BaseService from '../../../baseClasses/BaseService';
import PaginationHelper, {
  PaginationReturn,
} from '../../../helpers/PaginationHelper';
import Product from '../entities/Product';

export type GetProductsServiceReturn = PaginationReturn & {
  products: Product[];
};

export default class GetProductsService extends BaseService<
  [Product],
  GetProductsDTO
> {
  public async executer(
    data: GetProductsDTO
  ): Promise<GetProductsServiceReturn> {
    const [categories, categoriesValues] = this.query(
      data,
      'categories',
      'slug'
    );
    const [sizes, sizesValues] = this.query(data, 'sizes', 'name');

    const queries = [];
    let queriesValues = {};
    if (categories) {
      queries.push(categories);
      queriesValues = { ...queriesValues, ...categoriesValues };
    }
    if (sizes) {
      queries.push(sizes);
      queriesValues = { ...queriesValues, ...sizesValues };
    }
    const queriesWhere = queries.length > 0 ? queries.join(' AND ') : '1=1';

    let search: string[];
    if (data.search) {
      const searchArr = data.search.split(' ');
      search = searchArr.map((word) => `%${word}%`);
    }

    const searchWhere = data.search
      ? `(products.name ILIKE ANY(:search) OR products.description ILIKE ANY(:search) OR photos.description ILIKE ANY(:search) OR (sale.campaing ILIKE ANY(:search) AND sale.start_date <= NOW() AND sale.end_date >= NOW()) OR categories.name ILIKE ANY(:search) OR sizes.name ILIKE ANY(:search))`
      : '1=1';

    const finalStr = `${searchWhere} AND ${queriesWhere}`;

    const order = PaginationHelper.getOrder(data.orderBy, 'products');

    const products = await this.repository.product
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.categories', 'categories')
      .leftJoinAndSelect('products.sizes', 'sizes')
      .leftJoinAndSelect('products.sale', 'sale')
      .leftJoinAndSelect('products.photos', 'photos')
      .where(finalStr, { ...queriesValues, search })
      .skip(data.limit * (data.page - 1))
      .take(data.limit)
      .orderBy(order)
      .getMany();

    const count = await this.repository.product
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.categories', 'categories')
      .leftJoinAndSelect('products.sizes', 'sizes')
      .leftJoinAndSelect('products.sale', 'sale')
      .leftJoinAndSelect('products.photos', 'photos')
      .where(finalStr, { ...queriesValues, search })
      .orderBy(order)
      .getCount();

    return { count, products };
  }

  private query = (
    data: GetProductsDTO,
    key: string,
    column: string
  ): [string, object] => {
    let query: string;
    let queryValues = {};

    if (data[key]) {
      const splited = data[key].split(',');
      splited.forEach((category, index) => {
        if (index === 0) {
          query = `${key}.${column} ILIKE :${key}_${column}${index}`;
        } else {
          query = `${query} OR ${key}.${column} ILIKE :${key}_${column}${index}`;
        }
        queryValues = {
          ...queryValues,
          [`${key}_${column}${index}`]: `%${category}%`,
        };
      });
    }
    return [query, queryValues];
  };
}

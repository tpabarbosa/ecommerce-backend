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

    const queriesWhere = [];
    let queriesValues = {};
    if (categories) {
      queriesWhere.push(categories);
      queriesValues = { ...queriesValues, ...categoriesValues };
    }
    if (sizes) {
      queriesWhere.push(sizes);
      queriesValues = { ...queriesValues, ...sizesValues };
    }
    const where =
      queriesWhere.length > 0 ? queriesWhere.join(' OR ') : undefined;

    const order = PaginationHelper.getOrder(data.orderBy, 'products');

    let search: string[];
    if (data.search) {
      const searchArr = data.search.split(' ');
      search = searchArr.map((word) => `%${word}%`);
    }

    const products = await this.repository.product
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.categories', 'categories')
      .leftJoinAndSelect('products.sizes', 'sizes')
      .leftJoinAndSelect('products.sale', 'sale')
      .leftJoinAndSelect('products.photos', 'photos')
      .where(
        data.search
          ? `products.name ILIKE ANY(:search) OR products.description ILIKE ANY(:search) OR photos.description ILIKE ANY(:search) OR (sale.campaing ILIKE ANY(:search) AND sale.start_date <= NOW() AND sale.end_date >= NOW()) OR categories.name ILIKE ANY(:search) OR sizes.name ILIKE ANY(:search)`
          : '1=1',
        { search }
      )
      .andWhere(where && !data.search ? where : '1=1', queriesValues)
      .orWhere(where && data.search ? where : '1=0', queriesValues)

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
      .where(
        data.search
          ? `products.name ILIKE ANY(:search) OR products.description ILIKE ANY(:search) OR photos.description ILIKE ANY(:search) OR (sale.campaing ILIKE ANY(:search) AND sale.start_date <= NOW() AND sale.end_date >= NOW()) OR categories.name ILIKE ANY(:search) OR sizes.name ILIKE ANY(:search)`
          : '1=1',
        { search }
      )
      .andWhere(where && !data.search ? where : '1=1', queriesValues)
      .orWhere(where && data.search ? where : '1=0', queriesValues)
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

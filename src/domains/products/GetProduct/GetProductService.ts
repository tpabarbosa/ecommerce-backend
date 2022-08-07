import Product from '../entities/Product';

import { GetProductDTO } from '.';

import ProductNotFound from '../errors/ProductNotFound';
import BaseService from '../../../baseClasses/BaseService';

export default class GetProductService extends BaseService<
  [Product],
  GetProductDTO
> {
  public async executer(data: GetProductDTO): Promise<Product> {
    const where = data.id ? { id: data.id } : { slug: data.slug };
    const product = await this.repository.product.findOne({
      where,
      relations: {
        sale: true,
        photos: true,
        categories: true,
        sizes: true,
      },
    });

    if (!product) {
      throw new ProductNotFound();
    }

    return product;
  }
}

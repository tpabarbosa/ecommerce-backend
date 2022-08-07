import slugify from 'slugify';
import Product from '../entities/Product';

import { CreateProductDTO } from '.';

import Sale from '../entities/Sale';

import ProductToCategory from '../entities/ProductToCategory';
import Photo from '../entities/Photo';
import ProductToSize from '../entities/ProductToSize';
import ProductAlreadyExists from '../errors/ProductAlreadyExists';
import Size from '../entities/Size';
import Category from '../entities/Category';

import BaseService from '../../../baseClasses/BaseService';

export default class CreateProductService extends BaseService<
  [Product, Sale, ProductToCategory, ProductToSize],
  CreateProductDTO
> {
  public async executer(data: CreateProductDTO): Promise<Product> {
    const hasProduct = await this.repository.product.findOneBy({
      name: data.product.name,
    });

    if (hasProduct) {
      throw new ProductAlreadyExists();
    }

    const product = new Product();
    product.name = data.product.name;
    product.description = data.product.description;
    product.slug = slugify(data.product.name, {
      lower: true,
      strict: true,
      trim: true,
    });

    product.price = data.product.price;
    product.sale_id = data.product.sale_id;

    const photos: Photo[] = [];
    data.product.photos?.forEach((photo) => {
      const ph = new Photo();
      ph.description = photo.description;
      ph.url = photo.url;
      photos.push(ph);
    });
    product.photos = photos;

    const categories: Category[] = [];
    data.product.categories_id?.forEach((category) => {
      const productToCategory = new Category();
      productToCategory.id = category;
      categories.push(productToCategory);
    });
    product.categories = categories;

    const sizes: Size[] = [];
    data.product.sizes_id?.forEach((size) => {
      const productToSize = new Size();
      productToSize.id = size;

      sizes.push(productToSize);
    });
    product.sizes = sizes;

    await this.repository.product.save(product);

    return product;
  }
}

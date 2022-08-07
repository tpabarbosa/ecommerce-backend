import { IsNull } from 'typeorm';
import CartItem from '../entities/CartItem';

import { AddCartItemDTO } from '.';
import CartItemAlreadyExists from '../errors/CartItemAlreadyExists';
import ProductToSize from '../../products/entities/ProductToSize';
import SizeNotAvailable from '../errors/SizeNotAvailable';
import BaseService from '../../../baseClasses/BaseService';

export default class AddCartItemService extends BaseService<
  [CartItem, ProductToSize],
  AddCartItemDTO
> {
  public async executer(data: AddCartItemDTO): Promise<CartItem> {
    const where = data.size_id ? { ...data } : { ...data, size_id: IsNull() };

    const hasItem = await this.repository.cart.findOne({
      where,
    });

    if (hasItem) {
      throw new CartItemAlreadyExists();
    }

    if (data.size_id) {
      const isSizeValid = (await this.repository.size.findOne({
        where: { product_id: data.product_id, size_id: data.size_id },
      })) as ProductToSize;

      if (!isSizeValid) {
        throw new SizeNotAvailable();
      }
    }

    const item = this.repository.cart.create({
      ...data,
      quantity: 1,
    }) as CartItem;

    await this.repository.cart.save(item);

    return item;
  }
}

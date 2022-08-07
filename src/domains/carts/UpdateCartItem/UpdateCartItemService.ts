import CartItem from '../entities/CartItem';

import { UpdateCartItemDTO } from '.';
import CartItemNotFound from '../errors/CartItemNotFound';
import ProductToSize from '../../products/entities/ProductToSize';
import SizeNotAvailable from '../errors/SizeNotAvailable';
import BaseService from '../../../baseClasses/BaseService';

export default class UpdateCartItemService extends BaseService<
  [CartItem, ProductToSize],
  UpdateCartItemDTO
> {
  public async executer(data: UpdateCartItemDTO): Promise<CartItem> {
    const item = (await this.repository.cart.findOne({
      where: { id: data.item_id, user_id: data.user_id },
      relations: { product: true },
    })) as CartItem;

    if (!item) {
      throw new CartItemNotFound();
    }

    if (data.size_id) {
      const isSizeValid = (await this.repository.size.findOne({
        where: { product_id: item.product_id, size_id: data.size_id },
      })) as ProductToSize;

      if (!isSizeValid) {
        throw new SizeNotAvailable();
      }
      item.size_id = data.size_id;
    }

    if (data.quantity) {
      item.quantity = data.quantity;
    }

    await this.repository.cart.save(item);

    const resp = (await this.repository.cart.findOne({
      where: { id: data.item_id, user_id: data.user_id },
      relations: { size: true, product: true },
    })) as CartItem;

    console.log('RESP', resp);

    return resp;
  }
}

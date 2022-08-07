import CartItem from '../entities/CartItem';

import { RemoveCartItemDTO } from '.';
import ProductToSize from '../../products/entities/ProductToSize';
import CartItemNotFound from '../errors/CartItemNotFound';
import BaseService from '../../../baseClasses/BaseService';

export default class RemoveCartItemService extends BaseService<
  [CartItem, ProductToSize],
  RemoveCartItemDTO
> {
  public async executer(data: RemoveCartItemDTO): Promise<CartItem> {
    console.log('BEFORE DELETE', data.item_id);
    const item = (await this.repository.cart.findOne({
      where: { id: data.item_id, user_id: data.user_id },
    })) as CartItem;

    if (!item) {
      throw new CartItemNotFound();
    }

    // this.repository.cart.create(item) as CartItem;

    await this.repository.cart.remove(item);

    return item;
  }
}

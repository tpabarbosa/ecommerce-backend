import CartNotFound from '../errors/CartNotFound';
import Cart from '../entities/CartItem';

import { GetCartDTO } from '.';
import Product from '../../products/entities/Product';
import BaseService from '../../../baseClasses/BaseService';

export default class GetCartService extends BaseService<[Cart], GetCartDTO> {
  public async executer(
    data: GetCartDTO
  ): Promise<{ total: number; cart: Cart[] }> {
    const cart = (await this.repository.cart.find({
      select: { user_id: true, id: true, quantity: true },
      where: { ...data },
      relations: {
        product: { sale: true, photos: true, sizes: true },
        size: true,
      },
    })) as Cart[];

    if (!cart) {
      throw new CartNotFound();
    }

    const total = cart.reduce((acc, item) => {
      const t = acc + this.calcPrice(item.product) * item.quantity;

      return t;
    }, 0);

    return { total, cart };
  }

  private calcPrice(product: Product) {
    if (product.sale && product.sale.isActive()) {
      return product.price * (1 - product.sale.discount / 100);
    }
    return product.price;
  }
}

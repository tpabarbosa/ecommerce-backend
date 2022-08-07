import CartItem from '../entities/CartItem';

import { ClearCartDTO } from '.';

import BaseService from '../../../baseClasses/BaseService';
import CartNotFound from '../errors/CartNotFound';

export default class ClearCartService extends BaseService<
  [CartItem],
  ClearCartDTO
> {
  public async executer(data: ClearCartDTO): Promise<void> {
    const cart = (await this.repository.cart.find({
      where: { ...data },
    })) as CartItem[];

    if (!cart) {
      throw new CartNotFound();
    }
    await this.repository.cart.remove(cart);
  }
}

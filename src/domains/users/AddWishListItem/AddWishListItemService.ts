import { AddWishListItemDTO } from '.';
import BaseService from '../../../baseClasses/BaseService';

import WishList from '../entities/WishListItem';
import ProductAlreadyInWishList from '../errors/ProductAlreadyInWishList';

export default class AddWishListItemService extends BaseService<
  [WishList],
  AddWishListItemDTO
> {
  public async executer(data: AddWishListItemDTO): Promise<WishList> {
    const hasWishList = await this.repository.wishList.findOne({
      where: {
        user_id: data.user_id,
        product_id: data.product_id,
      },
    });
    if (hasWishList) {
      throw new ProductAlreadyInWishList();
    }

    const wishList = this.repository.wishList.create({ ...data });

    await this.repository.wishList.save(wishList);

    return wishList;
  }
}

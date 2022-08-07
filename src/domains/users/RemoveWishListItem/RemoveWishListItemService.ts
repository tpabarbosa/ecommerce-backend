import { RemoveWishListItemDTO } from '.';
import WishList from '../entities/WishListItem';
import ProductNotFound from '../../products/errors/ProductNotFound';
import BaseService from '../../../baseClasses/BaseService';

export default class RemoveWishListItemService extends BaseService<
  [WishList],
  RemoveWishListItemDTO
> {
  public async executer(data: RemoveWishListItemDTO): Promise<WishList> {
    const wishList = await this.repository.wishList.findOne({
      where: {
        user_id: data.user_id,
        product_id: data.product_id,
      },
    });
    if (!wishList) {
      throw new ProductNotFound();
    }

    await this.repository.wishList.remove(wishList);

    return wishList;
  }
}

import WishListNotFound from '../errors/WishListNotFound';
import WishList from '../entities/WishListItem';

import { GetWishListDTO } from '.';

import BaseService from '../../../baseClasses/BaseService';

export default class GetWishListService extends BaseService<
  [WishList],
  GetWishListDTO
> {
  public async executer(data: GetWishListDTO): Promise<WishList[]> {
    const wishList = (await this.repository.wishList.find({
      select: { user_id: true },
      where: { user_id: data.user_id },
      relations: {
        product: { sizes: true, categories: true, sale: true, photos: true },
      },
    })) as WishList[];

    if (!wishList) {
      throw new WishListNotFound();
    }

    return wishList;
  }
}

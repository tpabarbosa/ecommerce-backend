import { Request } from 'express';
import WishList from '../entities/WishListItem';

import { GetWishListDTO } from '.';
import StatusCode from '../../../enums/StatusCodesEnum';
import BaseController from '../../../baseClasses/BaseController';
import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';

export default class GetWishListController extends BaseController<
  [WishList],
  [GetWishListDTO]
> {
  public async handler(request: Request) {
    const data: GetWishListDTO = {
      user_id: request.params.user_id,
    };

    const wishList = (await this.service.getWishList.execute(
      data
    )) as WishList[];

    return new HttpSuccessResponse(StatusCode.OK, {
      message: 'Wish List successfully retrieved',
      data: wishList.map((items) => items.product.toView()),
    });
  }
}

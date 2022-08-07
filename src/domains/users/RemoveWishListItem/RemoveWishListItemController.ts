/* eslint-disable camelcase */
import { Request } from 'express';

import { RemoveWishListItemDTO } from '.';
import BaseController from '../../../baseClasses/BaseController';
import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';

import StatusCode from '../../../enums/StatusCodesEnum';
import WishList from '../entities/WishListItem';

export default class RemoveWishListItemController extends BaseController<
  [WishList],
  [RemoveWishListItemDTO]
> {
  public async handler(request: Request) {
    const { user_id, product_id } = request.params;

    const data: RemoveWishListItemDTO = {
      product_id,
      user_id,
    };

    await this.service.removeWishListItem.execute(data);

    return new HttpSuccessResponse(StatusCode.DELETED, {
      message: 'Product successfully removed from wishlist',
      data: undefined,
    });
  }
}

/* eslint-disable camelcase */
import { Request } from 'express';

import { AddWishListItemDTO } from '.';
import BaseController from '../../../baseClasses/BaseController';
import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';

import StatusCode from '../../../enums/StatusCodesEnum';
import WishList from '../entities/WishListItem';

export default class AddWishListItemController extends BaseController<
  [WishList],
  [AddWishListItemDTO]
> {
  public async handler(request: Request) {
    const { product_id } = request.body;

    const { user_id } = request.params;

    const data: AddWishListItemDTO = {
      product_id,
      user_id,
    };

    const resp = (await this.service.addWishListItem.execute(data)) as WishList;

    return new HttpSuccessResponse(StatusCode.CREATED, {
      message: 'Product added to Wish List',
      data: { product_id: resp.product_id },
    });
  }
}

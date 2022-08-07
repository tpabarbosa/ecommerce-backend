/* eslint-disable camelcase */
import { Request } from 'express';
import Cart from '../entities/CartItem';

import { RemoveCartItemDTO } from '.';
import StatusCode from '../../../enums/StatusCodesEnum';
import BaseController from '../../../baseClasses/BaseController';
import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';

export default class RemoveCartItemController extends BaseController<
  [Cart],
  [RemoveCartItemDTO]
> {
  public async handler(request: Request) {
    const { user_id, item_id } = request.params;

    const data: RemoveCartItemDTO = {
      user_id,
      item_id,
    };

    (await this.service.removeCartItem.execute(data)) as Cart;

    return new HttpSuccessResponse(StatusCode.DELETED, {
      message: 'Removed Item from Shopping Cart',
      data: undefined,
    });
  }
}

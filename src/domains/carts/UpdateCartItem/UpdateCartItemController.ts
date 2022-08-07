import { Request } from 'express';
import CartItem from '../entities/CartItem';

import { UpdateCartItemDTO } from '.';

import StatusCode from '../../../enums/StatusCodesEnum';

import BaseController from '../../../baseClasses/BaseController';
import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';

export default class UpdateCartItemController extends BaseController<
  [CartItem],
  [UpdateCartItemDTO]
> {
  public async handler(request: Request) {
    const { quantity, size_id } = request.body;
    const { user_id, item_id } = request.params;

    const data: UpdateCartItemDTO = {
      user_id,
      quantity,
      size_id,
      item_id,
    };

    const item = (await this.service.updateCartItem.execute(data)) as CartItem;

    return new HttpSuccessResponse(StatusCode.UPDATED, {
      message: 'Updated Item to Shopping Cart',
      data: item.toView(),
    });
  }
}

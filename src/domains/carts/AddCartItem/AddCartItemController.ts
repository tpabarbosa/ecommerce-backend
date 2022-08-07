import { Request } from 'express';
import CartItem from '../entities/CartItem';

import { AddCartItemDTO } from '.';

import StatusCode from '../../../enums/StatusCodesEnum';

import BaseController from '../../../baseClasses/BaseController';
import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';

export default class AddCartItemController extends BaseController<
  [CartItem],
  [AddCartItemDTO]
> {
  public async handler(request: Request) {
    const { product_id, size_id } = request.body;
    const { user_id } = request.params;

    const data: AddCartItemDTO = {
      user_id,
      product_id,
      size_id,
    };

    const item = (await this.service.addCartItem.execute(data)) as CartItem;

    return new HttpSuccessResponse(StatusCode.CREATED, {
      message: 'Added Item to Shopping Cart',
      data: item.toView(),
    });
  }
}

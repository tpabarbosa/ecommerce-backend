import { Request } from 'express';
import Cart from '../entities/CartItem';

import { GetCartDTO } from '.';

import StatusCode from '../../../enums/StatusCodesEnum';
import BaseController from '../../../baseClasses/BaseController';
import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';

export default class GetCartController extends BaseController<
  [Cart],
  [GetCartDTO]
> {
  public async handler(request: Request) {
    const { user_id } = request.params;

    const data: GetCartDTO = {
      user_id,
    };

    const { total, cart } = (await this.service.getCart.execute(data)) as {
      total: number;
      cart: Cart[];
    };

    return new HttpSuccessResponse(StatusCode.OK, {
      message: 'Shopping Cart successfully retrieved',
      data: { total, items: cart.map((items) => items.toView()) },
    });
  }
}

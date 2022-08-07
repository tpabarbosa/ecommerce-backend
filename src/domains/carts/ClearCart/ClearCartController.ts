import { Request } from 'express';
import CartItem from '../entities/CartItem';

import { ClearCartDTO } from '.';

import StatusCode from '../../../enums/StatusCodesEnum';
import BaseController from '../../../baseClasses/BaseController';
import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';

export default class ClearCartController extends BaseController<
  [CartItem],
  [ClearCartDTO]
> {
  public async handler(request: Request) {
    const { user_id } = request.params;

    const data: ClearCartDTO = {
      user_id,
    };

    await this.service.clearCart.execute(data);

    return new HttpSuccessResponse(StatusCode.DELETED, {
      message: 'Shopping Cart successfully cleared',
      data: undefined,
    });
  }
}

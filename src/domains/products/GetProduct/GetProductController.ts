import { Request } from 'express';
import Product from '../entities/Product';

import { GetProductDTO } from '.';
import StatusCode from '../../../enums/StatusCodesEnum';
import BaseController from '../../../baseClasses/BaseController';
import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';

export default class GetproductController extends BaseController<
  [Product],
  [GetProductDTO]
> {
  public async handler(request: Request) {
    const { id, slug } = request.params;

    const data: GetProductDTO = {
      id,
      slug,
    };

    const product = (await this.service.getProduct.execute(data)) as Product;

    return new HttpSuccessResponse(StatusCode.OK, {
      message: 'Product successfully retrieved',
      data: product.toViewDetails(),
    });
  }
}

/* eslint-disable camelcase */
import { Request } from 'express';

import { CreateProductDTO } from '.';
import BaseController from '../../../baseClasses/BaseController';
import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';
import StatusCode from '../../../enums/StatusCodesEnum';
import Product from '../entities/Product';

export default class CreateProductController extends BaseController<
  [Product],
  [CreateProductDTO]
> {
  public async handler(request: Request) {
    const {
      name,
      description,
      price,
      photos,
      sale_id,
      categories_id,
      sizes_id,
    } = request.body;

    const data: CreateProductDTO = {
      product: {
        name,
        description,
        price,
        photos,
        sale_id,
        categories_id,
        sizes_id,
      },
    };

    const product = (await this.service.createProduct.execute(data)) as Product;

    return new HttpSuccessResponse(StatusCode.CREATED, {
      message: 'Product successfully created',
      data: product.toView(),
    });
  }
}

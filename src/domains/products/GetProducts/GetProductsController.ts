import { Request } from 'express';

import { GetProductsDTO } from '.';
import BaseController from '../../../baseClasses/BaseController';
import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';
import StatusCode from '../../../enums/StatusCodesEnum';
import PaginationHelper, {
  PaginationFromRequest,
} from '../../../helpers/PaginationHelper';

import Product from '../entities/Product';
import { GetProductsServiceReturn } from './GetProductsService';

export default class GetProductsController extends BaseController<
  [Product],
  [GetProductsDTO]
> {
  public async handler(request: Request) {
    const { baseUrl, path } = request;
    const url = baseUrl + path;

    const search = request.query.search as string;
    const categories = request.query.categories as string;
    const sizes = request.query.sizes as string;

    const data: GetProductsDTO = {
      ...PaginationHelper.dto(request.query as PaginationFromRequest),
      search,
      categories,
      sizes,
    };

    const { count, products } = (await this.service.getProducts.execute(
      data
    )) as GetProductsServiceReturn;

    return new HttpSuccessResponse(StatusCode.OK, {
      message: 'Products successfully retrieved',
      data: {
        ...PaginationHelper.response(data, count, url, {
          search,
          categories,
          sizes,
        }),
        products: products.map((product) => product.toView()),
      },
    });
  }
}

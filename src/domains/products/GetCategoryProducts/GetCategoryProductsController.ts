import { Request } from 'express';
import ProductToCategory from '../entities/ProductToCategory';

import { GetCategoryProductsDTO } from '.';

import StatusCode from '../../../enums/StatusCodesEnum';
import BaseController from '../../../baseClasses/BaseController';
import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';
import PaginationHelper, {
  PaginationFromRequest,
} from '../../../helpers/PaginationHelper';
import { GetCategoryProductsServiceReturn } from './GetCategoryProductsService';

export default class GetCategoryProductsController extends BaseController<
  [ProductToCategory],
  [GetCategoryProductsDTO]
> {
  public async handler(request: Request) {
    const { baseUrl, path } = request;
    const url = baseUrl + path;

    const { id, slug } = request.params;

    const data: GetCategoryProductsDTO = {
      ...PaginationHelper.dto(request.query as PaginationFromRequest),
      id,
      slug,
    };

    const { count, products, category } =
      (await this.service.getCategoryProducts.execute(
        data
      )) as GetCategoryProductsServiceReturn;

    return new HttpSuccessResponse(StatusCode.OK, {
      message: 'Products successfully retrieved',
      data: {
        ...PaginationHelper.response(data, count, url),
        category: category.name,
        products: products.map((cat) => cat.toView().product),
      },
    });
  }
}

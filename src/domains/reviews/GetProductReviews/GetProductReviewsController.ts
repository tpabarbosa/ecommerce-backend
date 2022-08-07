import { Request } from 'express';

import { GetProductReviewsDTO } from '.';
import BaseController from '../../../baseClasses/BaseController';
import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';
import StatusCode from '../../../enums/StatusCodesEnum';
import PaginationHelper, {
  PaginationFromRequest,
} from '../../../helpers/PaginationHelper';

import Review from '../entities/Review';
import { GetProductReviewsServiceReturn } from './GetProductReviewsService';

export default class GetProductReviewsController extends BaseController<
  [Review],
  [GetProductReviewsDTO]
> {
  public async handler(request: Request) {
    const { baseUrl, path } = request;
    const url = baseUrl + path;

    const { product_id, slug } = request.params;

    const data: GetProductReviewsDTO = {
      ...PaginationHelper.dto(request.query as PaginationFromRequest),
      product_id,
      slug,
    };

    const { average_rate, count, productReviews } =
      (await this.service.getProductReviews.execute(
        data
      )) as GetProductReviewsServiceReturn;

    return new HttpSuccessResponse(StatusCode.OK, {
      message: 'Product Reviews successfully retrieved',
      data: {
        ...PaginationHelper.response(data, count, url),
        average_rate: parseFloat(average_rate as any),
        reviews: productReviews.map((review) => review.toViewProduct()),
      },
    });
  }
}

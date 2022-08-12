import { Request } from 'express';

import { GetUserReviewDTO } from '.';
import BaseController from '../../../baseClasses/BaseController';
import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';
import StatusCode from '../../../enums/StatusCodesEnum';

import Review from '../entities/Review';
import { GetUserReviewServiceReturn } from './GetUserReviewService';

export default class GetUserReviewController extends BaseController<
  [Review],
  [GetUserReviewDTO]
> {
  public async handler(request: Request) {
    const { user_id, product_id } = request.params;

    const data: GetUserReviewDTO = {
      product_id,
      user_id,
    };

    const { review } = (await this.service.getUserReviews.execute(
      data
    )) as GetUserReviewServiceReturn;

    return new HttpSuccessResponse(StatusCode.OK, {
      message: 'User Review successfully retrieved',
      data: review ? review.toViewProduct() : null,
    });
  }
}

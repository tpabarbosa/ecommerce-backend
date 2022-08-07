/* eslint-disable camelcase */
import { Request } from 'express';

import { CreateReviewDTO } from '.';
import BaseController from '../../../baseClasses/BaseController';
import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';
import StatusCode from '../../../enums/StatusCodesEnum';
import Review from '../entities/Review';

export default class CreateReviewController extends BaseController<
  [Review],
  [CreateReviewDTO]
> {
  public async handler(request: Request) {
    const { title, content, recommend, product_id, rating } = request.body;
    const { user_id } = request.params;
    const data: CreateReviewDTO = {
      title,
      content,
      recommend,
      product_id,
      rating,
      user_id,
    };

    const review = (await this.service.createReview.execute(data)) as Review;

    return new HttpSuccessResponse(StatusCode.CREATED, {
      message: 'Review successfully created',
      data: review.toView(),
    });
  }
}

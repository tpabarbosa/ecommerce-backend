import { Request } from 'express';

import { GetUserReviewsDTO } from '.';
import BaseController from '../../../baseClasses/BaseController';
import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';
import StatusCode from '../../../enums/StatusCodesEnum';
import PaginationHelper, {
  PaginationFromRequest,
} from '../../../helpers/PaginationHelper';

import Review from '../entities/Review';
import { GetUserReviewsServiceReturn } from './GetUserReviewsService';

export default class GetUserReviewsController extends BaseController<
  [Review],
  [GetUserReviewsDTO]
> {
  public async handler(request: Request) {
    const { baseUrl, path } = request;
    const url = baseUrl + path;

    const { user_id } = request.params;

    const data: GetUserReviewsDTO = {
      ...PaginationHelper.dto(request.query as PaginationFromRequest),
      user_id,
    };

    const { average_rate, count, userReviews } =
      (await this.service.getUserReviews.execute(
        data
      )) as GetUserReviewsServiceReturn;

    return new HttpSuccessResponse(StatusCode.OK, {
      message: 'User Reviews successfully retrieved',
      data: {
        ...PaginationHelper.response(data, count, url),
        average_rate: parseFloat(average_rate as any),
        reviews: userReviews.map((review) => review.toViewUser()),
      },
    });
  }
}

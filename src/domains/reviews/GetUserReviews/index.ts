import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import AppDataSource from '../../../database/data-source';

import GetUserReviewsController from './GetUserReviewsController';
import GetUserReviewsService from './GetUserReviewsService';
import Review from '../entities/Review';
import PaginationHelper, {
  PaginationDTO,
} from '../../../helpers/PaginationHelper';

export const getUserReviewsSchema = yup.object({
  query: PaginationHelper.querySchema,
  params: yup.object({
    user_id: yup.string().uuid('Invalid User Id').required().label('User Id'),
  }),
});

export type GetUserReviewsDTO = PaginationDTO & {
  user_id: string;
};

const GetUserReviews = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const reviewsRepository = AppDataSource.getRepository(Review);
  const getUserReviewsService = new GetUserReviewsService({
    review: reviewsRepository,
  });
  const getUserReviewsController = new GetUserReviewsController({
    getUserReviews: getUserReviewsService,
  });

  return getUserReviewsController.handle(request, response, next);
};

export default GetUserReviews;

import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import AppDataSource from '../../../database/data-source';

import GetUserReviewController from './GetUserReviewController';
import GetUserReviewService from './GetUserReviewService';
import Review from '../entities/Review';

export const getUserReviewSchema = yup.object({
  params: yup.object({
    user_id: yup.string().uuid('Invalid User Id').required().label('User Id'),
    product_id: yup
      .string()
      .uuid('Invalid Product Id')
      .required()
      .label('Product Id'),
  }),
});

export type GetUserReviewDTO = {
  user_id: string;
  product_id: string;
};

const GetUserReview = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const reviewsRepository = AppDataSource.getRepository(Review);
  const getUserReviewService = new GetUserReviewService({
    review: reviewsRepository,
  });
  const getUserReviewController = new GetUserReviewController({
    getUserReviews: getUserReviewService,
  });

  return getUserReviewController.handle(request, response, next);
};

export default GetUserReview;

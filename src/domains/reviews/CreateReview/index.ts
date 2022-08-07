/* eslint-disable camelcase */
import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import AppDataSource from '../../../database/data-source';
import CreateReviewService from './CreateReviewService';
import CreateReviewController from './CreateReviewController';
import Review from '../entities/Review';

export const createReviewSchema = yup.object({
  body: yup.object({
    title: yup.string().required().label('Title'),
    content: yup.string().required().label('Content'),
    recommend: yup.boolean().label('Recommend'),
    product_id: yup
      .string()
      .uuid('Invalid Product Id')
      .required()
      .label('Product'),
    rating: yup.number().integer().min(0).max(10).label('Rating'),
  }),
  params: yup.object({
    user_id: yup.string().uuid('Invalid User Id').required().label('User Id'),
  }),
});
export type CreateReviewDTO = {
  title: string;
  content: string;
  recommend?: boolean;
  product_id: string;
  rating?: number;
  user_id: string;
};

const CreateReview = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const reviewRepository = AppDataSource.getRepository(Review);

  const createReviewService = new CreateReviewService({
    review: reviewRepository,
  });

  const createReviewController = new CreateReviewController({
    createReview: createReviewService,
  });

  return createReviewController.handle(request, response, next);
};

export default CreateReview;

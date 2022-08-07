import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import AppDataSource from '../../../database/data-source';

import GetProductReviewsController from './GetProductReviewsController';
import GetProductReviewsService from './GetProductReviewsService';
import Review from '../entities/Review';
import PaginationHelper, {
  PaginationDTO,
} from '../../../helpers/PaginationHelper';

export const getProductReviewsSchema = yup.object({
  query: PaginationHelper.querySchema,
  params: yup.object({
    product_id: yup
      .string()
      .uuid('Invalid Product Id')
      .required()
      .label('Product Id'),
  }),
});
export const getProductSlugReviewsSchema = yup.object({
  query: PaginationHelper.querySchema,
  params: yup.object({
    slug: yup.string().required().label('Product Id'),
  }),
});

export type GetProductReviewsDTO = PaginationDTO & {
  product_id?: string;
  slug?: string;
};

const GetProductReviews = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const reviewsRepository = AppDataSource.getRepository(Review);
  const getProductReviewsService = new GetProductReviewsService({
    review: reviewsRepository,
  });
  const getProductReviewsController = new GetProductReviewsController({
    getProductReviews: getProductReviewsService,
  });

  return getProductReviewsController.handle(request, response, next);
};

export default GetProductReviews;

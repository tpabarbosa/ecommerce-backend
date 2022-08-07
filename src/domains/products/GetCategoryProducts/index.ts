import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import GetCategoryProductsService from './GetCategoryProductsService';
import AppDataSource from '../../../database/data-source';
import ProductToCategory from '../entities/ProductToCategory';

import GetCategoryProductsController from './GetCategoryProductsController';
import Category from '../entities/Category';
import PaginationHelper, {
  PaginationDTO,
} from '../../../helpers/PaginationHelper';

export const getCategoryProductsSchema = yup.object({
  query: PaginationHelper.querySchema,
  params: yup.object({
    id: yup
      .string()
      .uuid('Invalid Category Id')
      .required()
      .label('Category Id'),
  }),
});
export const getCategoryProductsSlugSchema = yup.object({
  params: yup.object({
    slug: yup.string().required().label('Category Id'),
  }),
});

export type GetCategoryProductsDTO = PaginationDTO & {
  id?: string;
  slug?: string;
};

const GetCategoryProducts = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const categoryProductsRepository =
    AppDataSource.getRepository(ProductToCategory);
  const categoryRepository = AppDataSource.getRepository(Category);

  const getCategoryProductsService = new GetCategoryProductsService({
    categoryProducts: categoryProductsRepository,
    category: categoryRepository,
  });
  const getCategoryProductsController = new GetCategoryProductsController({
    getCategoryProducts: getCategoryProductsService,
  });

  return getCategoryProductsController.handle(request, response, next);
};

export default GetCategoryProducts;

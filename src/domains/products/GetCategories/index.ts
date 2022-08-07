import { Request, Response, NextFunction } from 'express';
import AppDataSource from '../../../database/data-source';

import GetCategoriesController from './GetCategoriesController';
import GetCategoriesService from './GetCategoriesService';
import Category from '../entities/Category';

export type GetCategoriesDTO = Record<string, never>;

const GetCategories = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const getCategoriesService = new GetCategoriesService({
    category: categoryRepository,
  });
  const getCategoriesController = new GetCategoriesController({
    getCategories: getCategoriesService,
  });

  return getCategoriesController.handle(request, response, next);
};

export default GetCategories;

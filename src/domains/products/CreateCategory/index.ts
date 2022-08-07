/* eslint-disable camelcase */
import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import AppDataSource from '../../../database/data-source';
import Category from '../entities/Category';
import CreateCategoryService from './CreateCategoryService';
import CreateCategoryController from './CreateCategoryController';

export const createCategorySchema = yup.object({
  body: yup.object({
    name: yup.string().required().min(2).label('Category'),
  }),
});
export type CreateCategoryDTO = {
  category: {
    name: string;
  };
};

const CreateCategory = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const createCategoryService = new CreateCategoryService({
    category: categoryRepository,
  });

  const createCategoryController = new CreateCategoryController({
    createCategory: createCategoryService,
  });

  return createCategoryController.handle(request, response, next);
};

export default CreateCategory;

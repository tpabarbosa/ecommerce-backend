import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import AppDataSource from '../../../database/data-source';

import GetProductsController from './GetProductsController';
import GetProductsService from './GetProductsService';
import Product from '../entities/Product';
import PaginationHelper, {
  PaginationDTO,
} from '../../../helpers/PaginationHelper';

export const getProductsSchema = yup.object({
  query: PaginationHelper.querySchema.concat(
    yup.object({
      search: yup.string().label('Search'),
      categories: yup
        .string()
        .test(
          'emptyOrMatchesRegex',
          'Categories must be an empty string or must match "(category_slug1,category_slug2,...)"',
          (str) => {
            return /^(?:[A-Za-z]+,?)+$/.test(str) || str === '';
          }
        )
        .label('Categories'),
      sizes: yup
        .string()
        .test(
          'emptyOrMatchesRegex',
          'Sizes must be an empty string or must match "(size_name1,size_name2,...)"',
          (str) => {
            return /^(?:[A-Za-z]+,?)+$/.test(str) || str === '';
          }
        )
        .matches(
          /^(?:[A-Za-z]+,?)+$/,
          'Sizes must be "size_name1,size_name2,..."'
        )
        .label('Sizes'),
    })
  ),
});

export type GetProductsDTO = PaginationDTO & {
  search?: string;
  categories?: string;
  sizes?: string;
};

const GetProducts = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const productRepository = AppDataSource.getRepository(Product);
  const getProductsService = new GetProductsService({
    product: productRepository,
  });
  const getProductsController = new GetProductsController({
    getProducts: getProductsService,
  });

  return getProductsController.handle(request, response, next);
};

export default GetProducts;

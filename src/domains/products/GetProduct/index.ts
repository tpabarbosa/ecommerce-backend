import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import GetProductService from './GetProductService';
import AppDataSource from '../../../database/data-source';
import Product from '../entities/Product';
import GetProductController from './GetProductController';

export const getProductSchema = yup.object({
  params: yup.object({
    id: yup.string().uuid('Invalid Product Id').required().label('Product Id'),
  }),
});
export const getProductSlugSchema = yup.object({
  params: yup.object({
    slug: yup.string().required().label('Product Id'),
  }),
});

export type GetProductDTO = {
  id?: string;
  slug?: string;
};

const GetProduct = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const productRepository = AppDataSource.getRepository(Product);
  const getProductService = new GetProductService({
    product: productRepository,
  });
  const getProductController = new GetProductController({
    getProduct: getProductService,
  });

  return getProductController.handle(request, response, next);
};

export default GetProduct;

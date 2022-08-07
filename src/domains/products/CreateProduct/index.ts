import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import AppDataSource from '../../../database/data-source';
import Product from '../entities/Product';
import ProductToCategory from '../entities/ProductToCategory';
import ProductToSize from '../entities/ProductToSize';
import Sale from '../entities/Sale';
import CreateProductController from './CreateProductController';
import CreateProductService from './CreateProductService';

const imageSchema = yup.object({
  description: yup.string().label('Image Description'),
  url: yup.string().required().url().label('Image URL'),
});

export const createProductSchema = yup.object({
  body: yup.object({
    name: yup.string().required().min(2).label('Name'),
    description: yup.string().min(2).label('Description'),
    price: yup
      .number()
      .required()
      .test(
        'maxDigitsAfterDecimal',
        'Price field must have 2 digits after decimal or less',
        (number) => {
          if (number) {
            return /^\d+(\.\d{1,2})?$/.test(number.toString());
          }
          return false;
        }
      )
      .label('Price'),
    photos: yup.array().of(imageSchema).label('Images'),
    sale_id: yup.string().uuid().label('Sale'),
    categories_id: yup.array().of(yup.string().uuid()).label('Category'),
    sizes_id: yup.array().of(yup.string().uuid()).label('Sizes'),
  }),
});

export type CreateProductDTO = {
  product: {
    name: string;
    description?: string;
    price: number;
    photos: { url: string; description?: string }[];
    sale_id?: string;
    categories_id?: string[];
    sizes_id?: string[];
  };
};

const CreateProduct = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const productRepository = AppDataSource.getRepository(Product);
  const saleRepository = AppDataSource.getRepository(Sale);
  const categoryRepository = AppDataSource.getRepository(ProductToCategory);
  const sizesRepository = AppDataSource.getRepository(ProductToSize);

  const createProductService = new CreateProductService({
    product: productRepository,
    sale: saleRepository,
    category: categoryRepository,
    sizes: sizesRepository,
  });

  const createProductController = new CreateProductController({
    createProduct: createProductService,
  });

  return createProductController.handle(request, response, next);
};

export default CreateProduct;

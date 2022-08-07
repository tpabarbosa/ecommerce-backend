import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import AddCartItemService from './AddCartItemService';
import AppDataSource from '../../../database/data-source';
import Cart from '../entities/CartItem';
import AddCartItemController from './AddCartItemController';
import ProductToSize from '../../products/entities/ProductToSize';

export const addCartItemSchema = yup.object({
  body: yup.object({
    product_id: yup
      .string()
      .required()
      .uuid('Product Id is not valid')
      .label('Product Id'),
    size_id: yup.string().uuid('Size Id is not valid').label('Size Id'),
  }),
  params: yup.object({
    user_id: yup.string().uuid('Invalid User Id').required().label('User Id'),
  }),
});

export type AddCartItemDTO = {
  product_id: string;
  user_id: string;
  size_id?: string;
};

const AddCartItem = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const cartRepository = AppDataSource.getRepository(Cart);
  const sizeRepository = AppDataSource.getRepository(ProductToSize);
  const addCartItemService = new AddCartItemService({
    cart: cartRepository,
    size: sizeRepository,
  });
  const addCartItemController = new AddCartItemController({
    addCartItem: addCartItemService,
  });

  return addCartItemController.handle(request, response, next);
};

export default AddCartItem;

import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import UpdateCartItemService from './UpdateCartItemService';
import AppDataSource from '../../../database/data-source';
import Cart from '../entities/CartItem';
import UpdateCartItemController from './UpdateCartItemController';
import ProductToSize from '../../products/entities/ProductToSize';

export const updateCartItemSchema = yup.object({
  body: yup.object({
    size_id: yup.string().uuid('Size Id is not valid').label('Size Id'),
    quantity: yup.number().integer().positive().label('Quantity'),
  }),
  params: yup.object({
    item_id: yup
      .string()
      .uuid('Item Id is not valid')
      .required()
      .label('Item Id'),
    user_id: yup.string().uuid('Invalid User Id').required().label('User Id'),
  }),
});

export type UpdateCartItemDTO = {
  item_id: string;
  user_id: string;
  size_id?: string;
  quantity?: number;
};

const UpdateCartItem = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const cartRepository = AppDataSource.getRepository(Cart);
  const sizeRepository = AppDataSource.getRepository(ProductToSize);
  const updateCartItemService = new UpdateCartItemService({
    cart: cartRepository,
    size: sizeRepository,
  });
  const updateCartItemController = new UpdateCartItemController({
    updateCartItem: updateCartItemService,
  });

  return updateCartItemController.handle(request, response, next);
};

export default UpdateCartItem;

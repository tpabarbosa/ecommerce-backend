import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import RemoveCartItemService from './RemoveCartItemService';
import AppDataSource from '../../../database/data-source';
import Cart from '../entities/CartItem';
import RemoveCartItemController from './RemoveCartItemController';
import ProductToSize from '../../products/entities/ProductToSize';

export const removeCartItemSchema = yup.object({
  params: yup.object({
    user_id: yup.string().uuid('Invalid User Id').required().label('User Id'),
    item_id: yup
      .string()
      .required()
      .uuid('Item Id is not valid')
      .label('Item Id'),
  }),
});

export type RemoveCartItemDTO = {
  item_id: string;
  user_id: string;
};

const RemoveCartItem = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const cartRepository = AppDataSource.getRepository(Cart);
  const removeCartItemService = new RemoveCartItemService({
    cart: cartRepository,
  });
  const removeCartItemController = new RemoveCartItemController({
    removeCartItem: removeCartItemService,
  });

  return removeCartItemController.handle(request, response, next);
};

export default RemoveCartItem;

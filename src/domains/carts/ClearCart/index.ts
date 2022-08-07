import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import ClearCartService from './ClearCartService';
import AppDataSource from '../../../database/data-source';
import Cart from '../entities/CartItem';
import ClearCartController from './ClearCartController';

export const clearCartSchema = yup.object({
  params: yup.object({
    user_id: yup.string().uuid('Invalid User Id').required().label('User Id'),
  }),
});

export type ClearCartDTO = {
  user_id: string;
};

const ClearCart = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const cartRepository = AppDataSource.getRepository(Cart);

  const clearCartService = new ClearCartService({
    cart: cartRepository,
  });
  const clearCartController = new ClearCartController({
    clearCart: clearCartService,
  });

  return clearCartController.handle(request, response, next);
};

export default ClearCart;

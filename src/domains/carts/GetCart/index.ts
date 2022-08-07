import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import GetCartService from './GetCartService';
import AppDataSource from '../../../database/data-source';
import Cart from '../entities/CartItem';
import GetCartController from './GetCartController';

export const getCartSchema = yup.object({
  params: yup.object({
    user_id: yup.string().uuid('Invalid User Id').required().label('User Id'),
  }),
});

export type GetCartDTO = {
  user_id: string;
};

const GetCart = (request: Request, response: Response, next: NextFunction) => {
  const cartRepository = AppDataSource.getRepository(Cart);

  const getCartService = new GetCartService({
    cart: cartRepository,
  });
  const getCartController = new GetCartController({
    getCart: getCartService,
  });

  return getCartController.handle(request, response, next);
};

export default GetCart;

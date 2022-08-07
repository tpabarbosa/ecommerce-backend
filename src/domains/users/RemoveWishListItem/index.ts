import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import AppDataSource from '../../../database/data-source';
import WishList from '../entities/WishListItem';
import RemoveWishListItemController from './RemoveWishListItemController';
import RemoveWishListItemService from './RemoveWishListItemService';

export const removeWishListItemSchema = yup.object({
  params: yup.object({
    user_id: yup
      .string()
      .required()
      .uuid('User Id is not valid')
      .label('User Id'),
    product_id: yup
      .string()
      .required()
      .uuid('Product Id is not valid')
      .label('Product Id'),
  }),
});

export type RemoveWishListItemDTO = {
  product_id: string;
  user_id: string;
};

const RemoveWishListItem = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const wishListRepository = AppDataSource.getRepository(WishList);
  const removeWishListItemService = new RemoveWishListItemService({
    wishList: wishListRepository,
  });

  const removeWishListItemController = new RemoveWishListItemController({
    removeWishListItem: removeWishListItemService,
  });

  return removeWishListItemController.handle(request, response, next);
};

export default RemoveWishListItem;

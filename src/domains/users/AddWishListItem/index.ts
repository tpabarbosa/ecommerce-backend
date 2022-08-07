import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import AddWishListItemService from './AddWishListItemService';
import AppDataSource from '../../../database/data-source';
import WishList from '../entities/WishListItem';
import AddWishListItemController from './AddWishListItemController';

export const addWishListItemSchema = yup.object({
  body: yup.object({
    product_id: yup
      .string()
      .required()
      .uuid('Product Id is not valid')
      .label('Product Id'),
  }),
  params: yup.object({
    user_id: yup
      .string()
      .required()
      .uuid('User Id is not valid')
      .label('User Id'),
  }),
});

export type AddWishListItemDTO = {
  product_id: string;
  user_id: string;
};

const AddWishListItem = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const wishListRepository = AppDataSource.getRepository(WishList);
  const addWishListItemService = new AddWishListItemService({
    wishList: wishListRepository,
  });

  const addWishListItemController = new AddWishListItemController({
    addWishListItem: addWishListItemService,
  });

  return addWishListItemController.handle(request, response, next);
};

export default AddWishListItem;

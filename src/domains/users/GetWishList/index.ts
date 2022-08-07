import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import GetWishListService from './GetWishListService';
import AppDataSource from '../../../database/data-source';
import WishList from '../entities/WishListItem';
import GetWishListController from './GetWishListController';

export const getWishListSchema = yup.object({
  params: yup.object({
    user_id: yup.string().uuid('Invalid User Id').required().label('User Id'),
  }),
});

export type GetWishListDTO = {
  user_id: string;
};

const GetWishList = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const wishListRepository = AppDataSource.getRepository(WishList);

  const getWishListService = new GetWishListService({
    wishList: wishListRepository,
  });
  const getWishListController = new GetWishListController({
    getWishList: getWishListService,
  });

  return getWishListController.handle(request, response, next);
};

export default GetWishList;

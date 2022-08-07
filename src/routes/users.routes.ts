import { Router } from 'express';
import GetCart, { getCartSchema } from '../domains/carts/GetCart';
import ClearCart, { clearCartSchema } from '../domains/carts/ClearCart';
import AddCartItem, { addCartItemSchema } from '../domains/carts/AddCartItem';
import RemoveCartItem, {
  removeCartItemSchema,
} from '../domains/carts/RemoveCartItem';
import UpdateCartItem, {
  updateCartItemSchema,
} from '../domains/carts/UpdateCartItem';

import GetWishList, { getWishListSchema } from '../domains/users/GetWishList';
import CreateUser, { createUserSchema } from '../domains/users/CreateUser';
import validateSchema from '../middlewares/validation/validateSchema';
import authenticate from '../middlewares/authentication/authenticateJwtToken';
import authorize from '../middlewares/authorization/authorizeRoles';

import GetUser, { getUserSchema } from '../domains/users/GetUser';
import AddWishListItem, {
  addWishListItemSchema,
} from '../domains/users/AddWishListItem';
import RemoveWishListItem, {
  removeWishListItemSchema,
} from '../domains/users/RemoveWishListItem';

import GetUserReviews, {
  getUserReviewsSchema,
} from '../domains/reviews/GetUserReviews';

import CreateReview, {
  createReviewSchema,
} from '../domains/reviews/CreateReview';

import UserRole from '../enums/UserRoleEnum';

const usersRouter = Router();

usersRouter.post('/', validateSchema(createUserSchema), CreateUser);

usersRouter.use(authenticate);

// usersRouter.get('/', authorize([UserRole.USER]), GetUsers);

usersRouter.get(
  '/:user_id',
  authorize([UserRole.ADMIN, UserRole.USER]),
  validateSchema(getUserSchema),
  GetUser
);

usersRouter.get(
  '/:user_id/reviews',
  authorize([UserRole.ADMIN, UserRole.USER]),
  validateSchema(getUserReviewsSchema),
  GetUserReviews
);

usersRouter.post(
  '/:user_id/reviews',
  authorize(UserRole.USER),
  validateSchema(createReviewSchema),
  CreateReview
);

usersRouter.get(
  '/:user_id/cart',
  authorize([UserRole.ADMIN, UserRole.USER]),
  validateSchema(getCartSchema),
  GetCart
);

usersRouter.post(
  '/:user_id/cart',
  authorize([UserRole.ADMIN, UserRole.USER]),
  validateSchema(addCartItemSchema),
  AddCartItem
);

usersRouter.delete(
  '/:user_id/cart',
  authorize([UserRole.ADMIN, UserRole.USER]),
  validateSchema(clearCartSchema),
  ClearCart
);

usersRouter.delete(
  '/:user_id/cart/:item_id',
  authorize([UserRole.ADMIN, UserRole.USER]),
  validateSchema(removeCartItemSchema),
  RemoveCartItem
);

usersRouter.put(
  '/:user_id/cart/:item_id',
  authorize([UserRole.ADMIN, UserRole.USER]),
  validateSchema(updateCartItemSchema),
  UpdateCartItem
);

usersRouter.get(
  '/:user_id/wishlist',
  authorize([UserRole.ADMIN, UserRole.USER]),
  validateSchema(getWishListSchema),
  GetWishList
);

usersRouter.post(
  '/:user_id/wishlist',
  authorize(UserRole.USER),
  validateSchema(addWishListItemSchema),
  AddWishListItem
);

usersRouter.delete(
  '/:user_id/wishlist/:product_id',
  authorize([UserRole.ADMIN, UserRole.USER]),
  validateSchema(removeWishListItemSchema),
  RemoveWishListItem
);

// usersRouter.put('/:user_id', validateSchema(updateUserSchema), UpdateUser);

// usersRouter.delete('/:user_id', validateSchema(deleteUserSchema), DeleteUser);

export default usersRouter;

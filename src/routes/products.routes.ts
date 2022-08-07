import { Router } from 'express';
import CreateSale, { createSaleSchema } from '../domains/products/CreateSale';
import CreateSize, { createSizeSchema } from '../domains/products/CreateSize';
import CreateCategory, {
  createCategorySchema,
} from '../domains/products/CreateCategory';

import CreateProduct, {
  createProductSchema,
} from '../domains/products/CreateProduct';

import GetProduct, {
  getProductSchema,
  getProductSlugSchema,
} from '../domains/products/GetProduct';

import GetProducts, {
  getProductsSchema,
} from '../domains/products/GetProducts';

import GetCategoryProducts, {
  getCategoryProductsSchema,
  getCategoryProductsSlugSchema,
} from '../domains/products/GetCategoryProducts';

import validateSchema from '../middlewares/validation/validateSchema';
import authenticate from '../middlewares/authentication/authenticateJwtToken';
import authorize from '../middlewares/authorization/authorizeRoles';

import GetCategories from '../domains/products/GetCategories';
import UserRole from '../enums/UserRoleEnum';

import GetProductReviews, {
  getProductReviewsSchema,
  getProductSlugReviewsSchema,
} from '../domains/reviews/GetProductReviews';

const productsRouter = Router();

productsRouter.get(
  '/slugs/:slug',
  validateSchema(getProductSlugSchema),
  GetProduct
);
productsRouter.get('/categories', GetCategories);

productsRouter.get(
  '/categories/slugs/:slug',
  validateSchema(getCategoryProductsSlugSchema),
  GetCategoryProducts
);

productsRouter.get(
  '/categories/:id',
  validateSchema(getCategoryProductsSchema),
  GetCategoryProducts
);

productsRouter.get(
  '/slugs/:slug_id/reviews',
  validateSchema(getProductSlugReviewsSchema),
  GetProductReviews
);

productsRouter.get(
  '/:product_id/reviews',
  validateSchema(getProductReviewsSchema),
  GetProductReviews
);

productsRouter.get('/:id', validateSchema(getProductSchema), GetProduct);

productsRouter.get('/', validateSchema(getProductsSchema), GetProducts);

productsRouter.post(
  '/',
  authenticate,
  authorize(UserRole.ADMIN),
  validateSchema(createProductSchema),
  CreateProduct
);

productsRouter.post(
  '/sales',
  authenticate,
  authorize(UserRole.ADMIN),
  validateSchema(createSaleSchema),
  CreateSale
);

productsRouter.post(
  '/sizes',
  authenticate,
  authorize(UserRole.ADMIN),
  validateSchema(createSizeSchema),
  CreateSize
);

productsRouter.post(
  '/categories',
  authenticate,
  authorize(UserRole.ADMIN),
  validateSchema(createCategorySchema),
  CreateCategory
);

// products.put('/:id', validateSchema(updateUserSchema), UpdateUser);

// products.delete('/:id', validateSchema(deleteUserSchema), DeleteUser);

export default productsRouter;

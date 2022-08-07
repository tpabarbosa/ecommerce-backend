import ForbiddenError from '../../../middlewares/errorHandling/errors/ForbiddenError';

class ProductAlreadyInWishList extends ForbiddenError {
  constructor() {
    super('This Product already exists in Wish List');
  }
}

export default ProductAlreadyInWishList;

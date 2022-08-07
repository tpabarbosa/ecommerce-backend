import NotFoundError from '../../../middlewares/errorHandling/errors/NotFoundError';

class ProductNotFound extends NotFoundError {
  constructor() {
    super('Product not found');
  }
}

export default ProductNotFound;

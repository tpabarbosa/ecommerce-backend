import ForbiddenError from '../../../middlewares/errorHandling/errors/ForbiddenError';

class ProductAlreadyExists extends ForbiddenError {
  constructor() {
    super('Product already exists');
  }
}

export default ProductAlreadyExists;

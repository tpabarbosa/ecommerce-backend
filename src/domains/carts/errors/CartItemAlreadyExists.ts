import ForbiddenError from '../../../middlewares/errorHandling/errors/ForbiddenError';

class CartItemAlreadyExists extends ForbiddenError {
  constructor() {
    super('Cart Item already exists');
  }
}

export default CartItemAlreadyExists;

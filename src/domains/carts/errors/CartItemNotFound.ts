import NotFoundError from '../../../middlewares/errorHandling/errors/NotFoundError';

class CartItemNotFound extends NotFoundError {
  constructor() {
    super('Cart Item for this user was not found');
  }
}

export default CartItemNotFound;

import NotFoundError from '../../../middlewares/errorHandling/errors/NotFoundError';

class CartNotFound extends NotFoundError {
  constructor() {
    super('Cart for this user not found');
  }
}

export default CartNotFound;

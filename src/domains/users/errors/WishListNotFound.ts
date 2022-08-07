import NotFoundError from '../../../middlewares/errorHandling/errors/NotFoundError';

class WishListNotFound extends NotFoundError {
  constructor() {
    super('Wish List not found');
  }
}

export default WishListNotFound;

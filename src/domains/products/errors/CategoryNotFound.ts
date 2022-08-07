import NotFoundError from '../../../middlewares/errorHandling/errors/NotFoundError';

class CategoryNotFound extends NotFoundError {
  constructor() {
    super('Category not found');
  }
}

export default CategoryNotFound;

import ForbiddenError from '../../../middlewares/errorHandling/errors/ForbiddenError';

class CategoryAlreadyExists extends ForbiddenError {
  constructor() {
    super('Category already exists');
  }
}

export default CategoryAlreadyExists;

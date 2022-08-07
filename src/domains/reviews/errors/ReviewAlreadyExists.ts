import ForbiddenError from '../../../middlewares/errorHandling/errors/ForbiddenError';

class ReviewAlreadyExists extends ForbiddenError {
  constructor() {
    super('Review already exists');
  }
}

export default ReviewAlreadyExists;

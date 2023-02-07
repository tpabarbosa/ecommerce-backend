import ForbiddenError from '../../../middlewares/errorHandling/errors/ForbiddenError';

class InvalidUserError extends ForbiddenError {
  constructor() {
    super('Invalid user');
  }
}

export default InvalidUserError;

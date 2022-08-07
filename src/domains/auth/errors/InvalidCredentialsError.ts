import ForbiddenError from '../../../middlewares/errorHandling/errors/ForbiddenError';

class InvalidCredentialsError extends ForbiddenError {
  constructor() {
    super('Invalid credentials');
  }
}

export default InvalidCredentialsError;

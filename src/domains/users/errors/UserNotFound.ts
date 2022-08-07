import NotFoundError from '../../../middlewares/errorHandling/errors/NotFoundError';

class UserNotFound extends NotFoundError {
  constructor() {
    super('User not found');
  }
}

export default UserNotFound;

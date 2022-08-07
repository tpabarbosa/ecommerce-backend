import ForbiddenError from '../../../middlewares/errorHandling/errors/ForbiddenError';

class EmailAlreadyExists extends ForbiddenError {
  constructor() {
    super('Email already exists');
  }
}

export default EmailAlreadyExists;

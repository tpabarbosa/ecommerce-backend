import ForbiddenError from '../../../middlewares/errorHandling/errors/ForbiddenError';

class SizeAlreadyExists extends ForbiddenError {
  constructor() {
    super('Size already exists');
  }
}

export default SizeAlreadyExists;

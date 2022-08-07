import ForbiddenError from '../../../middlewares/errorHandling/errors/ForbiddenError';

class SizeNotAvailable extends ForbiddenError {
  constructor() {
    super('This Size is not available for this Product');
  }
}

export default SizeNotAvailable;

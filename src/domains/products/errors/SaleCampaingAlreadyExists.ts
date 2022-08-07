import ForbiddenError from '../../../middlewares/errorHandling/errors/ForbiddenError';

class SaleCampaingAlreadyExists extends ForbiddenError {
  constructor() {
    super('Sale Campaing already exists');
  }
}

export default SaleCampaingAlreadyExists;

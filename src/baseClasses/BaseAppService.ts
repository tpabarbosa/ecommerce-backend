import ApplicationError from '../middlewares/errorHandling/errors/ApplicationError';
import ApplicationServiceError from '../middlewares/errorHandling/errors/ApplicationServiceError';

abstract class BaseAppService<DTO> {
  public abstract executer(data: DTO): Promise<unknown>;

  public execute(data: DTO) {
    try {
      return this.executer(data);
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw error;
      }
      throw new ApplicationServiceError(
        'Some error occurred while trying to execute application service',
        error
      );
    }
  }
}

export default BaseAppService;

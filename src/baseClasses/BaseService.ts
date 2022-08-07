/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-useless-constructor */
import { EntityPropertyNotFoundError, Repository } from 'typeorm';
import { OneOf } from '../@types/typesHelper';
import ApplicationError from '../middlewares/errorHandling/errors/ApplicationError';
import BadRequestError from '../middlewares/errorHandling/errors/BadRequestError';
import DatabaseError from '../middlewares/errorHandling/errors/DatabaseError';

abstract class BaseService<Models extends {}[], DTO> {
  public constructor(
    protected repository?:
      | {
          [name: string]: Repository<OneOf<Models>>;
        }
      | undefined
  ) {}

  public abstract executer(data: DTO): Promise<unknown>;

  public async execute(data: DTO) {
    try {
      return await this.executer(data);
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw error;
      }
      if (error instanceof EntityPropertyNotFoundError) {
        throw new BadRequestError(error.message);
      } else {
        throw new DatabaseError(
          'Some error occurred while trying to execute database service',
          error
        );
      }
    }
  }
}

export default BaseService;

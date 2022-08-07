/* eslint-disable camelcase */
import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import AppDataSource from '../../../database/data-source';
import Size from '../entities/Size';
import CreateSizeService from './CreateSizeService';
import CreateSizeController from './CreateSizeController';

export const createSizeSchema = yup.object({
  body: yup.object({
    name: yup.string().required().min(1).label('Size'),
  }),
});
export type CreateSizeDTO = {
  size: {
    name: string;
  };
};

const CreateSize = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const sizeRepository = AppDataSource.getRepository(Size);

  const createSizeService = new CreateSizeService({
    size: sizeRepository,
  });

  const createSizeController = new CreateSizeController({
    createSize: createSizeService,
  });

  return createSizeController.handle(request, response, next);
};

export default CreateSize;

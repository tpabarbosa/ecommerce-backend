import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import AppDataSource from '../../../database/data-source';
import User from '../../users/entities/User';

import VerifyTokenController from './VerifyTokenController';
import VerifyTokenService from './verifyTokenService';

export const basicAuthorizationSchema = yup.object({
  param: yup.object({
    token: yup.string().required().label('Token'),
  }),
});

export type VerifyTokenDTO = {
  id: string;
};

const VerifyToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);
  const verifyTokenService = new VerifyTokenService({
    user: userRepository,
  });

  const verifyTokenController = new VerifyTokenController({
    verifyToken: verifyTokenService,
  });

  return verifyTokenController.handle(request, response, next);
};

export default VerifyToken;

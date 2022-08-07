import { Request, Response, NextFunction } from 'express';

import AppDataSource from '../../database/data-source';
import User from '../../domains/users/entities/User';

import JWTHelper from '../../helpers/JWTHelper';
import ValidationError from '../errorHandling/errors/ValidationError';

const authenticate = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new ValidationError('Authorization header not found');
    }

    const [authorizationType, jwtToken] = authorizationHeader.split(' ');

    if (authorizationType !== 'Bearer') {
      throw new ValidationError('Invalid authorization header type');
    }

    if (!jwtToken) {
      throw new ValidationError('Token not found');
    }

    const tokenPayload = JWTHelper.verify(jwtToken);

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id: tokenPayload.sub });

    request.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};

export default authenticate;

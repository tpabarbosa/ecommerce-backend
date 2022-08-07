import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import AppDataSource from '../../../database/data-source';
import User from '../entities/User';
import CreateUserController from './CreateUserController';
import CreateUserService from './CreateUserService';

export const createUserSchema = yup.object({
  body: yup.object({
    firstname: yup.string().required().min(2).label('Firstname'),
    lastname: yup.string().required().min(2).label('Lastname'),
    email: yup.string().email().required().label('Email'),
    password: yup.string().required().min(8).label('Password'),
  }),
});

export type CreateUserDTO = {
  user: {
    is_verified: boolean;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  };
};

const CreateUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);
  const createUserService = new CreateUserService({
    user: userRepository,
  });

  const createUserController = new CreateUserController({
    createUser: createUserService,
  });

  return createUserController.handle(request, response, next);
};

export default CreateUser;

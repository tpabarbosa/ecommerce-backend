import { Router } from 'express';
import validateSchema from '../middlewares/validation/validateSchema';
import getBasicAuthorizationCredentials from '../middlewares/authorization/getBasicAuthorizationCredentials';

import AuthenticateUser, {
  basicAuthorizationSchema,
} from '../domains/auth/AuthenticateUser';

import VerifyToken from '../domains/auth/VerifyToken';

const authRouter = Router();

authRouter.post(
  '/login',
  getBasicAuthorizationCredentials,
  validateSchema(basicAuthorizationSchema),
  AuthenticateUser
);

authRouter.get('/verify-token/:token', VerifyToken);

export default authRouter;

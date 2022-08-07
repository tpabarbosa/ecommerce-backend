import User from '../domains/users/entities/User';

declare global {
  namespace Express {
    interface Request {
      custom?: {
        basicAuthorizationCredentials?: {
          email: string;
          password: string;
        } | null;
      };
      user?: User;
    }
  }
}

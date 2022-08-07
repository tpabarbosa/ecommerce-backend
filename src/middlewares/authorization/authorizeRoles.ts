/* eslint-disable camelcase */
import { Request, Response, NextFunction } from 'express';

import UserRole from '../../enums/UserRoleEnum';
import UnauthorizedError from '../errorHandling/errors/UnauthorizedError';

const authorize =
  (roles: UserRole[] | UserRole) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { user_id } = request.params;
      const { id, role } = request.user;
      let routeRoles: string[];

      if (typeof roles === 'string') {
        routeRoles = [roles];
      } else {
        routeRoles = roles;
      }

      if (routeRoles.includes(UserRole.USER) && user_id === id) {
        return next();
      }
      if (routeRoles.includes(UserRole.ADMIN) && role === UserRole.ADMIN) {
        return next();
      }

      throw new UnauthorizedError('Unauthorized');
    } catch (error) {
      return next(error);
    }
  };

export default authorize;

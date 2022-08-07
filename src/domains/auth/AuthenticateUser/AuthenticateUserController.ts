import { Request } from 'express';
import User from '../../users/entities/User';

import { AuthenticateUserDTO } from '.';

import InvalidCredentialsError from '../errors/InvalidCredentialsError';
import PasswordHelper from '../../../helpers/PasswordHelper';
import StatusCode from '../../../enums/StatusCodesEnum';
import JWTHelper from '../../../helpers/JWTHelper';
import BaseController from '../../../baseClasses/BaseController';
import ApplicationError from '../../../middlewares/errorHandling/errors/ApplicationError';
import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';

export default class AuthenticateUserController extends BaseController<
  [User],
  [AuthenticateUserDTO]
> {
  public async handler(request: Request) {
    const { email, password } = request.custom.basicAuthorizationCredentials;

    const data: AuthenticateUserDTO = {
      email,
    };

    const user = (await this.service.authenticateUser.execute(data)) as User;

    if (!user || !this.isValidPassword(password, user.password)) {
      throw new InvalidCredentialsError();
    }

    const token = this.setAuthToken(user);

    if (!token) {
      throw new ApplicationError(
        'Error while generating token. Please try again.'
      );
    }
    return new HttpSuccessResponse(StatusCode.OK, {
      message: 'User successfully authenticated',
      data: { token, user: user.toView() },
    });
  }

  private isValidPassword(password: string, hashed: string) {
    return PasswordHelper.compare(password, hashed);
  }

  private setAuthToken(user: User) {
    return JWTHelper.generate(user);
  }
}

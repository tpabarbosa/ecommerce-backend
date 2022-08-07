import { Request } from 'express';

import { CreateUserDTO } from '.';
import BaseController from '../../../baseClasses/BaseController';
import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';

import StatusCode from '../../../enums/StatusCodesEnum';
import JWTHelper from '../../../helpers/JWTHelper';
import PasswordHelper from '../../../helpers/PasswordHelper';

import User from '../entities/User';

export default class CreateUserController extends BaseController<
  [User],
  [CreateUserDTO]
> {
  public async handler(request: Request) {
    const { firstname, lastname, email, password } = request.body;

    const data: CreateUserDTO = {
      user: {
        is_verified: false,
        firstname,
        lastname,
        email,
        password: this.setPassword(password),
      },
    };

    const resp = (await this.service.createUser.execute(data)) as User;

    const token = this.setAuthToken(resp);

    let message: string;
    if (!token) {
      message =
        'User successfully created, but an error ocurried while generating token. Please login again.';
    } else {
      message = 'User successfully created';
    }

    return new HttpSuccessResponse(StatusCode.CREATED, {
      message,
      data: { token },
    });
  }

  private setPassword(password: string) {
    return PasswordHelper.encrypt(password);
  }

  private setAuthToken(user: User) {
    return JWTHelper.generate(user);
  }
}

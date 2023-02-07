import { Request } from 'express';

import StatusCode from '../../../enums/StatusCodesEnum';
import JWTHelper from '../../../helpers/JWTHelper';
import BaseController from '../../../baseClasses/BaseController';

import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';
import { VerifyTokenDTO } from '.';
import User from '../../users/entities/User';
import InvalidUserError from '../errors/InvalidUserError';

export default class VerifyTokenController extends BaseController<
  [User],
  [VerifyTokenDTO]
> {
  public async handler(request: Request) {
    const token = request.params.token as string;

    const isValid = this.verifyToken(token);

    if (!isValid) {
      return new HttpSuccessResponse(StatusCode.OK, {
        message: 'This token is not valid',
        data: false,
      });
    }

    const data: VerifyTokenDTO = {
      id: isValid.sub,
    };
    const user = (await this.service.verifyToken.execute(data)) as User;

    if (!user) {
      throw new InvalidUserError();
    }

    return new HttpSuccessResponse(StatusCode.OK, {
      message: 'This token is valid',
      data: user.toView(),
    });
  }

  private verifyToken(jwtToken: string) {
    try {
      return JWTHelper.verify(jwtToken);
    } catch (error) {
      return false;
    }
  }
}

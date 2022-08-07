/* eslint-disable camelcase */
import { Request } from 'express';
import User from '../entities/User';

import { GetUserDTO } from '.';
import BaseController from '../../../baseClasses/BaseController';
import StatusCode from '../../../enums/StatusCodesEnum';
import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';

export default class GetUserController extends BaseController<
  [User],
  [GetUserDTO]
> {
  public async handler(request: Request) {
    const data: GetUserDTO = {
      id: request.params.user_id,
    };

    const user = (await this.service.getUser.execute(data)) as User;

    return new HttpSuccessResponse(StatusCode.OK, {
      message: 'User successfully retrieved',
      data: user.toView(),
    });
  }
}

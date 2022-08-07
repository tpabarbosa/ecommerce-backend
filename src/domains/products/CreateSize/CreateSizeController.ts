/* eslint-disable camelcase */
import { Request } from 'express';

import { CreateSizeDTO } from '.';
import BaseController from '../../../baseClasses/BaseController';
import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';
import StatusCode from '../../../enums/StatusCodesEnum';
import Size from '../entities/Size';

export default class CreateSizeController extends BaseController<
  [Size],
  [CreateSizeDTO]
> {
  public async handler(request: Request) {
    const { name } = request.body;

    const data: CreateSizeDTO = {
      size: {
        name,
      },
    };

    const size = (await this.service.createSize.execute(data)) as Size;

    return new HttpSuccessResponse(StatusCode.CREATED, {
      message: 'Sale successfully created',
      data: size.toView(),
    });
  }
}

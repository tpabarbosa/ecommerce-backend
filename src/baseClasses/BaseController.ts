/* eslint-disable no-useless-constructor */

import { Request, Response, NextFunction } from 'express';

import { OneOf } from '../@types/typesHelper';
import BaseAppService from './BaseAppService';
import BaseService from './BaseService';

import { HttpSuccessResponse } from './HttpResponse';

// eslint-disable-next-line @typescript-eslint/ban-types
abstract class BaseController<Models extends {}[], DTOS extends {}[]> {
  constructor(
    protected service: {
      [name: string]: OneOf<
        [BaseService<Models, OneOf<DTOS>>, BaseAppService<OneOf<DTOS>>]
      >;
    }
  ) {}

  public abstract handler(
    request: Request,
    response: Response,
    next?: NextFunction
  ): Promise<HttpSuccessResponse<unknown>>;

  public async handle(
    request: Request,
    response: Response,
    next?: NextFunction
  ): Promise<Response | void> {
    try {
      const httpResponse = await this.handler(request, response, next);
      console.log(httpResponse.body);
      return response.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error) {
      return next(error);
    }
  }
}

export default BaseController;

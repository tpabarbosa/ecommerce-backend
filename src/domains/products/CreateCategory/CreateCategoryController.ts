/* eslint-disable camelcase */
import { Request } from 'express';

import { CreateCategoryDTO } from '.';
import BaseController from '../../../baseClasses/BaseController';
import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';
import StatusCode from '../../../enums/StatusCodesEnum';
import Category from '../entities/Category';

export default class CreateCategoryController extends BaseController<
  [Category],
  [CreateCategoryDTO]
> {
  public async handler(request: Request) {
    const { name } = request.body;

    const data: CreateCategoryDTO = {
      category: {
        name,
      },
    };

    const category = (await this.service.createCategory.execute(
      data
    )) as Category;

    return new HttpSuccessResponse(StatusCode.CREATED, {
      message: 'Category successfully created',
      data: category.toView(),
    });
  }
}

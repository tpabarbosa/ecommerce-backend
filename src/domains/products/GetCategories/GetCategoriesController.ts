import { GetCategoriesDTO } from '.';
import BaseController from '../../../baseClasses/BaseController';
import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';
import StatusCode from '../../../enums/StatusCodesEnum';

import Category from '../entities/Category';

export default class GetCategoriesController extends BaseController<
  [Category],
  [GetCategoriesDTO]
> {
  public async handler() {
    const data: GetCategoriesDTO = {};

    const categories = (await this.service.getCategories.execute(
      data
    )) as Category[];

    return new HttpSuccessResponse(StatusCode.OK, {
      message: 'Categories successfully retrieved',
      data: categories.map((category) => category.toView()),
    });
  }
}

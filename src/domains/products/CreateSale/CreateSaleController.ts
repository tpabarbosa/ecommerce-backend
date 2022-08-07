/* eslint-disable camelcase */
import { Request } from 'express';

import { CreateSaleDTO } from '.';
import BaseController from '../../../baseClasses/BaseController';
import { HttpSuccessResponse } from '../../../baseClasses/HttpResponse';
import StatusCode from '../../../enums/StatusCodesEnum';

import Sale from '../entities/Sale';

export default class CreateSaleController extends BaseController<
  [Sale],
  [CreateSaleDTO]
> {
  public async handler(request: Request) {
    const {
      campaing,
      campaing_label,
      discount,
      badge_url,
      start_date,
      end_date,
    } = request.body;

    const data: CreateSaleDTO = {
      sale: {
        campaing,
        campaing_label,
        discount,
        badge_url,
        start_date,
        end_date,
      },
    };

    const sale = (await this.service.createSale.execute(data)) as Sale;

    return new HttpSuccessResponse(StatusCode.CREATED, {
      message: 'Sale successfully created',
      data: sale.toView(),
    });
  }
}

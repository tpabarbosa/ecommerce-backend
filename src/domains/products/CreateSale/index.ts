/* eslint-disable camelcase */
import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import AppDataSource from '../../../database/data-source';
import Sale from '../entities/Sale';
import CreateSaleService from './CreateSaleService';
import CreateSaleController from './CreateSaleController';

export const createSaleSchema = yup.object({
  body: yup.object({
    campaing: yup.string().required().min(2).label('Campaing unique name'),
    campaing_label: yup.string().required().min(2).label('Campaing Label'),
    discount: yup
      .number()
      .required()
      .positive()
      .lessThan(100)
      .test(
        'maxDigitsAfterDecimal',
        'Discount field must have 2 digits after decimal or less',
        (number) => {
          if (number) {
            return /^\d+(\.\d{1,2})?$/.test(number.toString());
          }
          return false;
        }
      )
      .label('Discount'),
    badge_url: yup.string().required().label('Campaing Badge URL'),
    start_date: yup.date().required().min(new Date()).label('Start Date'),
    end_date: yup
      .date()
      .required()
      .test(
        'endDateGreaterStartDate',
        'End Date must be greater than Start Date',
        function (end_date) {
          const { start_date } = this.parent;
          return end_date.getTime() > start_date.getTime();
        }
      )
      .label('End Date'),
  }),
});
export type CreateSaleDTO = {
  sale: {
    campaing: string;
    campaing_label: string;
    discount: number;
    badge_url: string;
    start_date: Date;
    end_date: Date;
  };
};

const CreateSale = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const saleRepository = AppDataSource.getRepository(Sale);

  const createSaleService = new CreateSaleService({
    sale: saleRepository,
  });

  const createSaleController = new CreateSaleController({
    createSale: createSaleService,
  });

  return createSaleController.handle(request, response, next);
};

export default CreateSale;

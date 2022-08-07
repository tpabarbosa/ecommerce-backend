import Sale from '../entities/Sale';

import { CreateSaleDTO } from '.';

import SaleCampaingAlreadyExists from '../errors/SaleCampaingAlreadyExists';
import BaseService from '../../../baseClasses/BaseService';

export default class CreateSaleService extends BaseService<
  [Sale],
  CreateSaleDTO
> {
  public async executer(data: CreateSaleDTO): Promise<Sale> {
    const hasSale = await this.repository.sale.findOneBy({
      campaing: data.sale.campaing,
    });

    if (hasSale) {
      throw new SaleCampaingAlreadyExists();
    }
    const sale = this.repository.sale.create({ ...data.sale });

    await this.repository.sale.save(sale);

    return sale;
  }
}

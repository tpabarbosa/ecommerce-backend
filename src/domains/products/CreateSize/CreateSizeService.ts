import Size from '../entities/Size';

import { CreateSizeDTO } from '.';
import SizeAlreadyExists from '../errors/SizeAlreadyExists';
import BaseService from '../../../baseClasses/BaseService';

export default class CreateSizeService extends BaseService<
  [Size],
  CreateSizeDTO
> {
  public async executer(data: CreateSizeDTO): Promise<Size> {
    const hasSize = await this.repository.size.findOneBy({
      name: data.size.name,
    });

    if (hasSize) {
      throw new SizeAlreadyExists();
    }
    const size = this.repository.size.create({ ...data.size });

    await this.repository.size.save(size);

    return size;
  }
}

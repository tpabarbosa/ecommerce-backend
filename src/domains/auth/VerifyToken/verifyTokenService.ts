import User from '../../users/entities/User';

import { VerifyTokenDTO } from '.';
import BaseService from '../../../baseClasses/BaseService';

export default class VerifyTokenService extends BaseService<
  [User],
  VerifyTokenDTO
> {
  public async executer(data: VerifyTokenDTO): Promise<User> {
    const user = await this.repository.user.findOne({
      where: { id: data.id },
    });

    return user;
  }
}

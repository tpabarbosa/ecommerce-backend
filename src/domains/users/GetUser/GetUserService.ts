import User from '../entities/User';

import { GetUserDTO } from '.';
import BaseService from '../../../baseClasses/BaseService';

import UserNotFound from '../errors/UserNotFound';

export default class GetUserService extends BaseService<[User], GetUserDTO> {
  public async executer(data: GetUserDTO): Promise<User> {
    const user = await this.repository.user.findOne({
      where: { id: data.id },
    });

    if (!user) {
      throw new UserNotFound();
    }

    return user;
  }
}

import User from '../entities/User';

import { CreateUserDTO } from '.';

import EmailAlreadyExists from '../errors/EmailAlreadyExists';
import BaseService from '../../../baseClasses/BaseService';

export default class CreateUserService extends BaseService<
  [User],
  CreateUserDTO
> {
  public async executer(data: CreateUserDTO): Promise<User> {
    const hasUser = await this.repository.user.findOne({
      where: {
        email: data.user.email,
      },
    });
    if (hasUser) {
      throw new EmailAlreadyExists();
    }

    const user = this.repository.user.create({ ...data.user });

    await this.repository.user.save(user);

    return user;
  }
}

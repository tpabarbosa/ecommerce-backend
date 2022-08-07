import User from '../../users/entities/User';

import { AuthenticateUserDTO } from '.';
import BaseService from '../../../baseClasses/BaseService';

export default class AuthenticateUserService extends BaseService<
  [User],
  AuthenticateUserDTO
> {
  public async executer(data: AuthenticateUserDTO): Promise<User> {
    const user = await this.repository.user.findOne({
      where: { email: data.email },
    });

    return user;
  }
}

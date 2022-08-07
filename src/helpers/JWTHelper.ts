import JWT from 'jsonwebtoken';
import config from '../config';
import User from '../domains/users/entities/User';
import ValidationError from '../middlewares/errorHandling/errors/ValidationError';

const generate = (user: User) => {
  try {
    const token = JWT.sign({}, config.jwt_private_key, {
      audience: 'shopping-frontend',
      subject: user.id,
      expiresIn: '2h',
    });
    return token;
  } catch (error) {
    return '';
  }
};

const verify = (jwtToken: string) => {
  try {
    const tokenPayload = JWT.verify(jwtToken, config.jwt_private_key);

    if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
      throw new ValidationError('Invalid token');
    }

    return tokenPayload;
  } catch (error) {
    throw new ValidationError('Invalid token');
  }
};

export default { generate, verify };

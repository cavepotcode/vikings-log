import { verify, sign, decode } from 'jsonwebtoken';
import { environment } from '../../environments/environment';
import { getRepository } from '../datastore';
import { User } from '../datastore/entities/user';
import { UserIn, LoginIn } from '../models/user.model';
import { encrypt } from '../sdk/encrypt';
import { ResponseCode, Response } from '../models/response.models';

export class UserService {
  
  async login({ username, password: plainPassword }: LoginIn) {
    const password = encrypt(plainPassword);

    const userRepository = await getRepository(User);
    const user: User = await userRepository.findOne({ username, password });
    if (!user) {
      return new Response(ResponseCode.ERROR, 'Username or password is invalid. Please try again');
    }

    const token = sign({ username, email: user.email, id: user.id }, environment.jwt.secret, {
      expiresIn: 60 * environment.jwt.timestamp
    });

    return new Response(ResponseCode.OK, '', {token});
  }
}
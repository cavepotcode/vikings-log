import { sign } from 'jsonwebtoken';
import { environment } from '../../environments/environment';
import { getRepository } from '../datastore';
import { User } from '../datastore/entities/user';
import { LoginIn } from '../models/user.model';
import { encrypt } from '../sdk/encrypt';
import { Response } from '../sdk/response';
import { ResponseCode } from '../sdk/constants';

export class UserService {
  
  async get(email){
    const userRepository = await getRepository(User);
    const user: User = await userRepository.findOne({ email });
    return user;
  }
}
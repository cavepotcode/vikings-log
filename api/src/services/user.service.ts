import { getRepository } from '../datastore';
import { User } from '../datastore/entities/user';


export class UserService {

    async get(email) {
        const userRepository = await getRepository(User);
        const user: User = await userRepository.findOne({ email });
        return user;
    }

    async update(user) {
        const userRepository = await getRepository(User);
        return userRepository.save(user);
    }
}
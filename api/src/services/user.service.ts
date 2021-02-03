import { getRepository } from '../datastore';
import { User } from '../datastore/entities/user';
import { UserStatus } from '../sdk/constants';
import { ObjectID } from 'mongodb';



export class UserService {

    async get(email: string) {
        const userRepository = await getRepository(User);
        const condition = { where: { email: email, status: UserStatus.ACTIVE } }
        const user: User = await userRepository.findOne(condition);
        return user;
    }
    async getAll() {
        const userRepository = await getRepository(User);
        const condition = { where: { status: UserStatus.ACTIVE } }
        return await userRepository.find(condition);
    }

    async getById(id: string) {
        const userRepository = await getRepository(User);
        const condition = { where: { _id: new ObjectID(id), status: UserStatus.ACTIVE } }
        return await userRepository.findOne(condition);
    }

    async update(user: User) {
        const userRepository = await getRepository(User);
        return userRepository.save(user);
    }

    async delete(id: string) {
        const userRepository = await getRepository(User);
        return await userRepository.findOneAndUpdate({ _id: new ObjectID(id) }, { $set: { status: UserStatus.DELETED } });
    }
}
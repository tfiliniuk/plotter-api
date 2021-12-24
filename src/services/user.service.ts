import { FindOneOptions, getRepository } from 'typeorm';

import { User } from 'typeorm/entities/users/User';
import { normalizeEmailAddress } from 'utils/normalize';
import { CustomError } from 'utils/response/custom-error/CustomError';

class UserService {
  get repository() {
    return getRepository(User);
  }

  async getByToken(firebase_id: string, options?: FindOneOptions) {
    const user = await this.repository.findOne({ firebase_id }, options);

    if (!user) {
      throw CustomError.NotFound('Cannot find user record');
    }
    return user;
  }

  async getByEmail(rawEmail?: string) {
    const email = normalizeEmailAddress(rawEmail);
    const user = await this.repository
      .createQueryBuilder('user')
      .where('LOWER(user.email) = :email', { email })
      .getOne();

    return user || null;
  }

  async getById(userId: number, options?: FindOneOptions<User>) {
    const user = await this.repository.findOne(userId, options);
    if (!user) {
      throw CustomError.NotFound('Cannot find user record');
    }
    return user;
  }

  async save(user: User) {
    return this.repository.save(user);
  }
}

const userService = new UserService();
export { userService };

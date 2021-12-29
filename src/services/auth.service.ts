import { createQueryBuilder, getRepository, Repository } from 'typeorm';

import { UserDto } from 'dtos/user-dto';
import { userService } from 'services/user.service';
import { User } from 'typeorm/entities/users/User';
import { fCreateToken, fGetOrCreateUser, fSignInWithEmailAndPassword } from 'utils/firebase';
import { CustomError } from 'utils/response/custom-error/CustomError';

class AuthService {
  async registration(email: string, password: string, first_name: string, last_name: string) {
    const userRepository: Repository<User> = getRepository(User);
    const isExist = await userService.getByEmail(email);
    if (isExist) {
      throw CustomError.BadRequest(`User with email ${email} already exists`);
    }
    const firebase_id: string = await fGetOrCreateUser({
      email,
      password,
      displayName: `${first_name} ${last_name}`,
    });

    const newUser: User = await userRepository.create({
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      email,
      firebase_id,
    });

    const createdUser = await userRepository.save(newUser);
    const user = new UserDto(createdUser);
    const { token, refreshToken } = await fCreateToken(firebase_id);

    return { token, refreshToken, user };
  }

  async login(email: string, password: string) {
    const user = await createQueryBuilder(User, 'user').where('LOWER(user.email) = :email', { email }).getOne();
    if (!user) {
      throw CustomError.NotFound('User not found');
    }
    const userDto = new UserDto(user);

    const { token, refreshToken } = await fSignInWithEmailAndPassword(email, password);
    return { token, refreshToken, user: userDto };
  }
}

const authService = new AuthService();
export { authService };

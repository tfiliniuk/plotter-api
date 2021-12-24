import { User } from 'typeorm/entities/users/User';

class UserDto {
  email: string;
  id: number;
  firstName: string;
  lastName: string;

  constructor(model: User) {
    this.email = model.email;
    this.id = model.id;
    this.firstName = model.first_name;
    this.lastName = model.last_name;
  }
}

export { UserDto };

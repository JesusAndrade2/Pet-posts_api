import { User } from '../../../data';
import { CustomError, RegisterUserDto } from '../../../domain';

export class RegisterUserService {
  async execute(data: RegisterUserDto) {
    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;

    try {
      await user.save();
      return {
        message: 'user create succesfully 👌',
      };
    } catch (error) {
      throw CustomError.internalServerError('failed to register user');
    }
  }
}

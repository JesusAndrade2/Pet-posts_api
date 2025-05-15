import { User } from '../../../data';

export class RegisterUserService {
  async execute(data: any) {
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
      console.error('error creating user');
      throw new Error('failed to create user');
    }
  }
}

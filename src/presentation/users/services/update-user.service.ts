import { CustomError, RegisterUserDto } from '../../../domain';
import { FinderUserService } from './finder-users.service';

export class UpdateUserService {
  constructor(private readonly finderUserService: FinderUserService) {}

  async execute(id: string, data: RegisterUserDto) {
    const user = await this.finderUserService.executeByFindOne(id);

    user.name = data.name;
    user.email = data.email;
    user.password = data.password;

    try {
      await user.save();
      return {
        message: 'user updated succesfully ✌',
      };
    } catch (error) {
      console.error('error updating user:', error);
      throw CustomError.internalServerError('failed to updated user');
    }
  }
}

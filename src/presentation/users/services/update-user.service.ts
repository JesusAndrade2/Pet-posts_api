import { CustomError, RegisterUserDto, UpdateUserDto } from '../../../domain';
import { FinderUserService } from './finder-users.service';

export class UpdateUserService {
  constructor(private readonly finderUserService: FinderUserService) {}

  async execute(id: string, data: UpdateUserDto) {
    const user = await this.finderUserService.executeByFindOne(id);

    user.name = data.name;
    user.email = data.email;

    try {
      await user.save();
      return {
        message: 'user updated succesfully ✌',
      };
    } catch (error) {
      throw CustomError.internalServerError('failed to updated user');
    }
  }
}

import { CustomError } from '../../../domain';
import { FinderUserService } from './finder-users.service';

export class DeleteUserService {
  constructor(private readonly fiderUserService: FinderUserService) {}

  async execute(id: string) {
    const user = await this.fiderUserService.executeByFindOne(id);

    try {
      await user.remove();
      return {
        message: 'user delete succesfully ✨',
      };
    } catch (error) {
      throw CustomError.internalServerError('failed to delete user');
    }
  }
}

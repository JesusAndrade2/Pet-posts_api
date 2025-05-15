import { FinderUserService } from './finder-users.service';

export class DeleteUserService {
  constructor(private readonly fiderUserService: FinderUserService) {}

  async execute(id: string) {
    const user = await this.fiderUserService.executeByFindOne(id);

    user.status = false;

    try {
      await user.save();
      return {
        message: 'user delete succesfully ✨',
      };
    } catch (error) {
      console.error(error);
      throw new Error('failed to delete user');
    }
  }
}

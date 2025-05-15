import { FinderUserService } from './finder-users.service';

export class UpdateUserService {
  constructor(private readonly finderUserService: FinderUserService) {}

  async execute(id: string, data: any) {
    const user = await this.finderUserService.executeByFindOne(id);

    user.password = data.password;
    user.email = data.email;
    user.name = data.name;

    try {
      await user.save();
      return {
        message: 'user updated succesfully ✌',
      };
    } catch (error) {
      console.error('error updating user:', error);
      throw new Error('failed to updated user');
    }
  }
}

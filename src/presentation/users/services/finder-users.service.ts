import { User } from '../../../data';
import { CustomError } from '../../../domain';

export class FinderUserService {
  async executeByFindAll() {
    const users = await User.find({
      relations: {
        pet_post: true,
      },
      select: ['id', 'name', 'email', 'role', 'status', 'created_at'],
    });
    return users;
  }

  async executeByFindOne(id: string) {
    const user = await User.findOne({
      where: { id: id, status: true },
      relations: {
        pet_post: true,
      },
      select: ['id', 'name', 'email', 'role', 'status', 'created_at'],
    });

    if (!user) {
      throw CustomError.notFound('user not found');
    }
    return user;
  }

  async executeByEmail(email: string) {
    const user = await User.findOne({
      where: { email, status: true },
    });

    if (!user) {
      throw CustomError.notFound('user not found');
    }
    return user;
  }
}

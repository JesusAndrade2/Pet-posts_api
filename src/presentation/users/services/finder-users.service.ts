import { User } from '../../../data';
import { CustomError } from '../../../domain';

export class FinderUserService {
  async executeByFindAll() {
    const users = await User.find({
      select: ['id', 'name', 'email', 'role'],
      where: { status: true },
    });
    return users;
  }

  async executeByFindOne(id: string) {
    const user = await User.findOne({ where: { id: id, status: true } });

    if (!user) {
      throw CustomError.notFound('user not found');
    }
    return user;
  }

  async executeByname(name: string) {
    const user = await User.findOne({ where: { name: name, status: true } });

    if (!user) {
      throw CustomError.notFound('user not found');
    }
    return user;
  }
}

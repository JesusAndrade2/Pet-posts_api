import { User } from '../../../data';

export class FinderUserService {
  async executeByFindAll() {
    const users = await User.find({ where: { status: true } });
    return users;
  }

  async executeByFindOne(id: string) {
    const user = await User.findOne({ where: { id: id, status: true } });

    if (!user) {
      throw new Error('user not found');
    }
    return user;
  }

  async executeByname(name: string) {
    const user = await User.findOne({ where: { name: name, status: true } });

    if (!user) {
      throw new Error('user not found');
    }
    return user;
  }
}

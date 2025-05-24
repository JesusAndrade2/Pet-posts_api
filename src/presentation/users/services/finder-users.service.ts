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

  async executeByEmail0rName(email?: string, name?: string) {
    let search: string | undefined = email ? email : name;
    let key: string = email ? 'email' : 'name';

    const user = await User.findOne({
      where: { [key]: search, status: true },
    });

    console.log(user);

    if (!user) {
      throw CustomError.notFound('user not found');
    }
    console.log(user);
    return user;
  }
}

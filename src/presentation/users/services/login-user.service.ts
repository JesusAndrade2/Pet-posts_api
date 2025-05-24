import { LoginUserDto } from '../../../domain/dtos/users/login-user.dto';
import { FinderUserService } from './finder-users.service';

export class LoginUserService {
  constructor(private readonly finderUserService: FinderUserService) {}

  async execute(data: LoginUserDto) {
    const user = await this.finderUserService.executeByEmail0rName(data.email);

    if (!user) return { message: 'user not found' };

    if (user.password === data.password) {
      return { message: ' acces allowed' };
    } else {
      return { message: 'acces dennied' };
    }
  }
}

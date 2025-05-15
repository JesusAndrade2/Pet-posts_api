import { FinderUserService } from './finder-users.service';

export class LoginUserService {
  constructor(private readonly finderUserService: FinderUserService) {}

  async execute(data: any) {
    const user = await this.finderUserService.executeByname(data.name);

    if (user.password === data.password) {
      return { message: ' acces allowed' };
    } else {
      return { message: 'acces dennied' };
    }
  }
}

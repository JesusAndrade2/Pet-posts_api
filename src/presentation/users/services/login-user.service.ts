import { encryptAdapter, envs, JwtAdapter } from '../../../config';
import { User } from '../../../data';
import { CustomError } from '../../../domain';
import { LoginUserDto } from '../../../domain/dtos/users/login-user.dto';
import { FinderUserService } from './finder-users.service';

export class LoginUserService {
  constructor(private readonly finderUserService: FinderUserService) {}

  async execute(credentials: LoginUserDto) {
    const user = await this.ensureUserExist(credentials);

    this.esurePasswordIsCorrect(credentials, user);

    const token = await this.generateToken(
      { id: user.id },
      envs.JWET_EXPIRE_IN
    );

    return {
      token,
      user: {
        id: user.id,
        fullname: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  private esurePasswordIsCorrect(credentials: LoginUserDto, user: User) {
    const isMatch = encryptAdapter.compare(credentials.password, user.password);

    if (!isMatch) {
      throw CustomError.unAuthorized('invalid credentials');
    }
  }

  private async ensureUserExist(credentials: LoginUserDto) {
    const user = await User.findOne({
      where: { email: credentials.email, status: true },
    });

    if (!user) {
      throw CustomError.unAuthorized('invalid credentials');
    }

    return user;
  }

  private async generateToken(payload: any, duration: any) {
    const token = await JwtAdapter.generateToken(payload, duration);

    if (!token) {
      throw CustomError.internalServerError('Error while creating Jwt');
    }

    return token;
  }
}

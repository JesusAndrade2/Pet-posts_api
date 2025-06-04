import { encryptAdapter, JwtAdapter } from '../../../config';
import { User } from '../../../data';
import { CustomError, RegisterUserDto } from '../../../domain';
import { EmailService } from '../../common/services/email.service';

export class RegisterUserService {
  constructor(private readonly emailService: EmailService) {}

  public validateAccount = async (token: string) => {
    const payload = await this.validateToken(token);

    const { email } = payload as { email: string };

    if (!email) {
      throw CustomError.internalServerError('email is not found in token');
    }

    const user = await this.ensureUserExistWithEmail(email);

    user.status = true;

    try {
      await user.save();
      return 'user Activated';
    } catch (error) {
      throw CustomError.internalServerError('something went very wrong');
    }
  };

  private sendLinktoEmailFromValidationAcoount = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email }, '600s');
    if (!token) throw CustomError.internalServerError('error getting token');

    const link = `http://www.localhost:3000/api/v1/users/validate-account/${token}`;
    console.log(link);

    const html = `
    <h1>validate your email</h1>
    <p>Clic on the following link to validate your email </p>
    <a href="${link}" > Validate your email : ${email} </a>`;

    const isSent = await this.emailService.sendEmail({
      to: email,
      subject: 'validate your account',
      htmlBody: html,
    });

    if (!isSent) throw CustomError.internalServerError('error sending email');

    return true;
  };

  private async ensureUserExistWithEmail(email: string) {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw CustomError.internalServerError('email no registered in db');
    }
    return user;
  }

  private async validateToken(token: string) {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) throw CustomError.badRequest('invalid email token');
    return payload;
  }

  async execute(data: RegisterUserDto) {
    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = encryptAdapter.hash(data.password);

    try {
      await user.save();
      this.sendLinktoEmailFromValidationAcoount(data.email);
      return {
        message: 'user create succesfully 👌',
      };
    } catch (error) {
      throw CustomError.internalServerError('failed to register user');
    }
  }
}

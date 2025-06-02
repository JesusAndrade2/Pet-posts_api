import { Request, Response } from 'express';
import { RegisterUserService } from './services/register-user.service';
import { LoginUserService } from './services/login-user.service';
import { FinderUserService } from './services/finder-users.service';
import { UpdateUserService } from './services/update-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { handleError } from '../common/handleError';
import { LoginUserDto, RegisterUserDto } from '../../domain';

export class UserController {
  constructor(
    private readonly registerUserService: RegisterUserService,
    private readonly loginUserService: LoginUserService,
    private readonly finderUserService: FinderUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService
  ) {}

  validateAccount = (req: Request, res: Response) => {
    const { token } = req.params;

    this.registerUserService
      .validateAccount(token)
      .then((result) => res.status(201).json(result))
      .catch((error) => handleError(error, res));
  };

  userRegister = (req: Request, res: Response) => {
    const [error, data] = RegisterUserDto.execute(req.body);

    if (error) {
      res.status(422).json({
        status: 'validate error',
        message: error,
      });
    }
    this.registerUserService
      .execute(data!)
      .then((result) => res.status(201).json(result))
      .catch((error) => handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const [error, data] = LoginUserDto.execute(req.body);

    if (error) {
      res.status(422).json({
        status: 'validate error',
        message: error,
      });
    }

    this.loginUserService
      .execute(data!)
      .then((data) => {
        res.cookie('token', data.token, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 3 * 60 * 60 * 1000,
        });
        res.status(200).json(data);
      })
      .catch((error) => handleError(error, res));
  };

  findAllUsers = (req: Request, res: Response) => {
    this.finderUserService
      .executeByFindAll()
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };

  finOneUser = (req: Request, res: Response) => {
    const { id } = req.params;
    this.finderUserService
      .executeByFindOne(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };

  updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, data] = RegisterUserDto.execute(req.body);

    if (error) {
      res.status(422).json({
        status: 'validate error',
        message: error,
      });
    }

    this.updateUserService
      .execute(id, data!)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };

  deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    this.deleteUserService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };
}

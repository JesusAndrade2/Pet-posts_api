import { Request, Response } from 'express';
import { RegisterUserService } from './services/register-user.service';
import { LoginUserService } from './services/login-user.service';
import { FinderUserService } from './services/finder-users.service';
import { UpdateUserService } from './services/update-user.service';
import { DeleteUserService } from './services/delete-user.service';

export class UserController {
  constructor(
    private readonly registerUserService: RegisterUserService,
    private readonly loginUserService: LoginUserService,
    private readonly finderUserService: FinderUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService
  ) {}

  userRegister = (req: Request, res: Response) => {
    const data = req.body;
    this.registerUserService
      .execute(data)
      .then((result) => res.status(201).json(result))
      .catch((error) => {
        return res.status(500).json(error);
      });
  };

  loginUser = (req: Request, res: Response) => {
    const data = req.body;

    this.loginUserService
      .execute(data)
      .then((result) => res.status(200).json(result))
      .catch((error) => {
        return res.status(500).json(error);
      });
  };

  findAllUsers = (req: Request, res: Response) => {
    this.finderUserService
      .executeByFindAll()
      .then((result) => res.status(200).json(result))
      .catch((error) => {
        return res.status(500).json(error);
      });
  };

  finOneUser = (req: Request, res: Response) => {
    const { id } = req.params;
    this.finderUserService
      .executeByFindOne(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => {
        return res.status(500).json(error);
      });
  };

  updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    this.updateUserService
      .execute(id, data)
      .then((result) => res.status(200).json(result))
      .catch((error) => {
        return res.status(500).json(error);
      });
  };

  deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    this.deleteUserService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => {
        return res.status(500).json(error);
      });
  };
}

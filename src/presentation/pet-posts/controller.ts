import { Request, Response } from 'express';
import { CreatePetPostService } from './services/creator-pet-post.service';
import { FinderPetPostService } from './services/finder-pet-posts.service';
import { UpdatePetPostService } from './services/update-pet-post.service';
import { DeletePetPostService } from './services/delete-pet-post.service';
import { StatusPetPostService } from './services/status-pet-post.service';
import { handleError } from '../common/handleError';
import { CreatePetPostsDto } from '../../domain/dtos/pet-posts/create-pet-post.dto';
import { UpdatePetPostsDto } from '../../domain/dtos/pet-posts/update-pet-posts.dto';

export class PetPostController {
  constructor(
    private readonly createPetPostService: CreatePetPostService,
    private readonly finderPetPostService: FinderPetPostService,
    private readonly updatePetPostService: UpdatePetPostService,
    private readonly deletePetPostService: DeletePetPostService,
    private readonly statusPetPostService: StatusPetPostService
  ) {}

  createPetPost = (req: Request, res: Response) => {
    const [error, data] = CreatePetPostsDto.execute(req.body);

    if (error) {
      return res.status(422).json({
        status: 'validate error',
        message: error,
      });
    }
    this.createPetPostService
      .execute(data!)
      .then((result) => res.status(201).json(result))
      .catch((error) => handleError(error, res));
  };

  findALlPetPost = (req: Request, res: Response) => {
    this.finderPetPostService
      .executeByFindAll()
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };

  findOnePetPost = (req: Request, res: Response) => {
    const { id } = req.params;
    this.finderPetPostService
      .executeByFindOne(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };

  updatePetPost = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, data] = UpdatePetPostsDto.execute(req.body);

    if (error) {
      return res.status(422).json({
        status: 'validate error',
        message: error,
      });
    }

    this.updatePetPostService
      .execute(id, data!)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };

  deletePetPost = (req: Request, res: Response) => {
    const { id } = req.params;
    this.deletePetPostService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };

  approvePetPost = (req: Request, res: Response) => {
    const { id } = req.params;
    this.statusPetPostService
      .executeByApproved(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };

  rejectPetPost = (req: Request, res: Response) => {
    const { id } = req.params;
    this.statusPetPostService
      .executeByRejected(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };
}

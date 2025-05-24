import { Request, Response } from 'express';
import { CreatePetPostService } from './services/creator-pet-post.service';
import { FinderPetPostService } from './services/finder-pet-posts.service';
import { UpdatePetPostService } from './services/update-pet-post.service';
import { DeletePetPostService } from './services/delete-pet-post.service';
import { StatusPetPostService } from './services/status-pet-post.service';
import { handleError } from '../common/handleError';

export class PetPostController {
  constructor(
    private readonly createPetPostService: CreatePetPostService,
    private readonly finderPetPostService: FinderPetPostService,
    private readonly updatePetPostService: UpdatePetPostService,
    private readonly deletePetPostService: DeletePetPostService,
    private readonly statusPetPostService: StatusPetPostService
  ) {}

  createPetPost = (req: Request, res: Response) => {
    const data = req.body;
    this.createPetPostService
      .execute(data)
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
    const data = req.body;

    this.updatePetPostService
      .execute(id, data)
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

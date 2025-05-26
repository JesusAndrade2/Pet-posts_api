import { Router } from 'express';
import { PetPostController } from './controller';
import { FinderUserService } from '../users/services/finder-users.service';
import { CreatePetPostService } from './services/creator-pet-post.service';
import { FinderPetPostService } from './services/finder-pet-posts.service';
import { UpdatePetPostService } from './services/update-pet-post.service';
import { DeletePetPostService } from './services/delete-pet-post.service';
import { StatusPetPostService } from './services/status-pet-post.service';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';
import { UserRol } from '../../data';

export class PetPostRoutes {
  static get routes(): Router {
    const router = Router();

    const finderUserService = new FinderUserService();
    const createPetPostService = new CreatePetPostService(finderUserService);
    const finderPetPostsService = new FinderPetPostService();
    const updatePetPostService = new UpdatePetPostService(
      finderPetPostsService
    );
    const deletePetPostService = new DeletePetPostService(
      finderPetPostsService
    );
    const statusPetPostService = new StatusPetPostService(
      finderPetPostsService
    );

    const petPostController = new PetPostController(
      createPetPostService,
      finderPetPostsService,
      updatePetPostService,
      deletePetPostService,
      statusPetPostService
    );

    router.post(
      '/',
      AuthMiddleware.restrictTo(UserRol.USER),
      petPostController.createPetPost
    );
    router.get('/', petPostController.findALlPetPost);
    router.get('/:id', petPostController.findOnePetPost);
    router.patch(
      '/:id',
      AuthMiddleware.restrictTo(UserRol.ADMIN),
      petPostController.updatePetPost
    );
    router.delete(
      '/:id',
      AuthMiddleware.restrictTo(UserRol.ADMIN),
      petPostController.deletePetPost
    );
    router.patch(
      '/:id/approve',
      AuthMiddleware.restrictTo(UserRol.ADMIN),
      petPostController.approvePetPost
    );
    router.patch(
      '/:id/reject',
      AuthMiddleware.restrictTo(UserRol.ADMIN),
      petPostController.rejectPetPost
    );

    return router;
  }
}

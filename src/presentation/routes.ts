import { Router } from 'express';
import { UserRoutes } from './users/routes';
import { PetPostRoutes } from './pet-posts/routes';
import { AuthMiddleware } from './common/middlewares/auth.middleware';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/v1/users', UserRoutes.routes);
    router.use(
      '/api/v1/pet-posts',
      AuthMiddleware.protect,
      PetPostRoutes.routes
    );

    return router;
  }
}

import { CustomError } from '../../../domain';
import { FinderPetPostService } from './finder-pet-posts.service';

export class DeletePetPostService {
  constructor(private readonly fiderPetPostService: FinderPetPostService) {}

  async execute(id: string) {
    const petPost = await this.fiderPetPostService.executeByFindOne(id);

    petPost.hasFound = true;

    try {
      await petPost.save();
      return {
        message: 'Pet-Post delete succesfully ✨',
      };
    } catch (error) {
      throw CustomError.internalServerError('failed to delete Pet-Post');
    }
  }
}

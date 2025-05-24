import { PetPostStatus } from '../../../data';
import { CustomError } from '../../../domain';
import { FinderPetPostService } from './finder-pet-posts.service';

export class StatusPetPostService {
  constructor(private readonly finderPetPostService: FinderPetPostService) {}

  async executeByApproved(id: string) {
    const petPost = await this.finderPetPostService.executeByFindOne(id);

    petPost.status = PetPostStatus.APPROVED;

    try {
      await petPost.save();
      return {
        message: 'petPost approved succesfully ',
      };
    } catch (error) {
      throw CustomError.internalServerError('failed to approved pet-post');
    }
  }

  async executeByRejected(id: string) {
    const petPost = await this.finderPetPostService.executeByFindOne(id);

    petPost.status = PetPostStatus.REJECTED;

    try {
      await petPost.save();
      return {
        message: 'petPost rejected succesfully ',
      };
    } catch (error) {
      throw CustomError.internalServerError('failed to rejected pet-post');
    }
  }
}

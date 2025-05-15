import { PetPostStatus } from '../../../data';
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
      console.error('error approving pet-post:', error);
      throw new Error('failed to approved pet-post');
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
      console.error('error rejecting pet-post:', error);
      throw new Error('failed to rejected pet-post');
    }
  }
}

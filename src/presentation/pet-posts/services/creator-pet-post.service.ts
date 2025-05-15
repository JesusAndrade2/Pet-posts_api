import { PetPost } from '../../../data';
import { FinderUserService } from '../../users/services/finder-users.service';

export class CreatePetPostService {
  constructor(private readonly finderUsersService: FinderUserService) {}

  async execute(data: any) {
    const petPost = new PetPost();
    const owner = await this.finderUsersService.executeByname(data.owner);

    if (!owner) return { message: 'user dont have any account' };

    petPost.pet_name = data.pet_name;
    petPost.description = data.description;
    petPost.owner = owner.id;
    petPost.image_url = data.image_url;

    try {
      await petPost.save();
      return {
        message: 'pet-post create succesfully',
      };
    } catch (error) {
      console.error('error creating pet-post', error);
      throw new Error('failed to create pet-post');
    }
  }
}

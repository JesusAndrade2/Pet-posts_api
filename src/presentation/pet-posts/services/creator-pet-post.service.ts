import { PetPost } from '../../../data';
import { CustomError } from '../../../domain';
import { CreatePetPostsDto } from '../../../domain/dtos/pet-posts/create-pet-post.dto';
import { FinderUserService } from '../../users/services/finder-users.service';

export class CreatePetPostService {
  constructor(private readonly finderUsersService: FinderUserService) {}

  async execute(data: CreatePetPostsDto) {
    const petPost = new PetPost();
    const owner = await this.finderUsersService.executeByEmail0rName(
      '',
      data.owner
    );

    console.log(owner);
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
      throw CustomError.internalServerError('failed to create pet post');
    }
  }
}

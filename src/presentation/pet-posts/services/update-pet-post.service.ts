import { CustomError } from '../../../domain';
import { UpdatePetPostsDto } from '../../../domain/dtos/pet-posts/update-pet-posts.dto';
import { FinderPetPostService } from './finder-pet-posts.service';

export class UpdatePetPostService {
  constructor(private readonly finderPetPostService: FinderPetPostService) {}

  async execute(id: string, data: UpdatePetPostsDto) {
    const petPost = await this.finderPetPostService.executeByFindOne(id);

    petPost.pet_name = data?.pet_name;
    petPost.description = data?.description;
    petPost.image_url = data?.image_url;
    petPost.hasFound = data?.hasFound;

    try {
      await petPost.save();
      return {
        message: 'petPost updated succesfully ✌',
      };
    } catch (error) {
      throw CustomError.internalServerError('failed to updated pet-post');
    }
  }
}

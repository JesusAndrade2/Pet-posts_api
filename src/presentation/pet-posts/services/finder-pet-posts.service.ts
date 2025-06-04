import { PetPost } from '../../../data';
import { CustomError } from '../../../domain';

export class FinderPetPostService {
  async executeByFindAll() {
    const petPosts = await PetPost.find({
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          created_at: true,
        },
      },
    });
    return petPosts;
  }

  async executeByFindOne(id: string) {
    const petPost = await PetPost.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          created_at: true,
        },
      },
    });
    // const petPost = await PetPost.createQueryBuilder('pet_post')
    //   .leftJoinAndSelect('pet_post.user', 'user')
    //   .select([
    //     'pet_post',
    //     'user.id',
    //     'user.name',
    //     'user.email',
    //     'user.role',
    //     'user.status',
    //     'usercreated_at',
    //   ])
    //   .where('pet_post.id= :petID', { petId: id })
    //   .andWhere('pet_post.staus = :status', { status: true })
    //   .getOne();

    if (!petPost) {
      throw CustomError.notFound('Pet-post not found');
    }
    return petPost;
  }
}

import { PetPost } from '../../../data';

export class FinderPetPostService {
  async executeByFindAll() {
    const petPosts = await PetPost.find({ where: { hasFound: false } });
    return petPosts;
  }

  async executeByFindOne(id: string) {
    const petPost = await PetPost.findOne({
      where: { id: id, hasFound: false },
    });

    if (!petPost) {
      throw new Error('user not found');
    }
    return petPost;
  }
}

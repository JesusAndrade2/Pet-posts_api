import {
  maxLength,
  minLength,
  nonEmpty,
  object,
  pipe,
  safeParse,
  string,
  url,
} from 'valibot';

export const CreatePetPostsSchema = object({
  pet_name: pipe(
    string('pet_name is required'),
    minLength(3, 'pet_name must be at least 3 characters long'),
    maxLength(70, 'pet_name must be at most 70 characters long')
  ),

  description: pipe(
    string('description is required'),
    minLength(10, 'description must be at least 10 characters long'),
    maxLength(1000, 'description must be at most 1000 characters long')
  ),

  owner: pipe(
    string('owner is required'),
    minLength(3, 'pet_name must be at least 3 characters long'),
    maxLength(70, 'pet_name must be at most 70 characters long')
  ),

  image_url: pipe(
    string('image_url is required'),
    url('image_url must be a valid URL'),
    nonEmpty('image_url cannot be empty')
  ),
});

export class CreatePetPostsDto {
  constructor(
    public readonly pet_name: string,
    public readonly description: string,
    public readonly owner: string,
    public readonly image_url: string
  ) {}

  static execute(input: { [key: string]: any }): [string?, CreatePetPostsDto?] {
    const result = safeParse(CreatePetPostsSchema, input);

    if (!result.success) {
      const error = result.issues[0]?.message ?? 'validation failed';
      return [error];
    }

    const { pet_name, description, owner, image_url } = result.output as {
      pet_name: string;
      description: string;
      owner: string;
      image_url: string;
    };

    return [
      undefined,
      new CreatePetPostsDto(pet_name, description, owner, image_url),
    ];
  }
}

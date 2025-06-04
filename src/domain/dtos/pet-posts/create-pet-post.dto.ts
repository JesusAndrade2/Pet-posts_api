import {
  maxLength,
  minLength,
  nonEmpty,
  object,
  pipe,
  safeParse,
  string,
  url,
  uuid,
} from 'valibot';

export const CreatePetPostsSchema = object({
  pet_name: pipe(
    string('pet_name is not in format required'),
    minLength(3, 'pet_name must be at least 3 characters long'),
    maxLength(70, 'pet_name must be at most 70 characters long')
  ),

  description: pipe(
    string('description is not in format required'),
    minLength(10, 'description must be at least 10 characters long'),
    maxLength(1000, 'description must be at most 1000 characters long')
  ),

  ownerId: pipe(
    string('ownerId is not in format required'),
    uuid('ownerId is not a valid format')
  ),

  image_url: pipe(
    string('image_url is not in format required'),
    url('image_url must be a valid URL'),
    nonEmpty('image_url cannot be empty')
  ),
});

export class CreatePetPostsDto {
  constructor(
    public readonly pet_name: string,
    public readonly description: string,
    public readonly ownerId: string,
    public readonly image_url: string
  ) {}

  static execute(input: { [key: string]: any }): [string?, CreatePetPostsDto?] {
    if (!('pet_name' in input)) {
      return ['pet_name is required'];
    }
    if (!('description' in input)) {
      return ['description is required'];
    }
    if (!('ownerId' in input)) {
      return ['ownerId is required'];
    }
    if (!('image_url' in input)) {
      return ['image_url is required'];
    }

    const result = safeParse(CreatePetPostsSchema, input);

    if (!result.success) {
      const error = result.issues[0]?.message ?? 'validation failed';
      return [error];
    }

    const { pet_name, description, ownerId, image_url } = result.output as {
      pet_name: string;
      description: string;
      ownerId: string;
      image_url: string;
    };

    return [
      undefined,
      new CreatePetPostsDto(pet_name, description, ownerId, image_url),
    ];
  }
}

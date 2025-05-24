import { NoConnectionOptionError } from 'typeorm';
import {
  boolean,
  maxLength,
  minLength,
  nonEmpty,
  nullable,
  object,
  pipe,
  safeParse,
  string,
  url,
} from 'valibot';

export const UpdatePetPostsSchema = object({
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

  image_url: pipe(
    string('image_url is required'),
    url('image_url must be a valid URL')
  ),

  hasFound: pipe(boolean('hasFound must be a boolean')),
});

export class UpdatePetPostsDto {
  constructor(
    public readonly pet_name: string,
    public readonly description: string,
    public readonly hasFound: boolean,
    public readonly image_url: string
  ) {}

  static execute(input: { [key: string]: any }): [string?, UpdatePetPostsDto?] {
    const result = safeParse(UpdatePetPostsSchema, input);

    if (!result.success) {
      const error = result.issues[0]?.message ?? 'validacion failed';
      return [error];
    }

    const { pet_name, description, hasFound, image_url } = result.output as {
      pet_name: string;
      description: string;
      hasFound: boolean;
      image_url: string;
    };

    return [
      undefined,
      new UpdatePetPostsDto(pet_name, description, hasFound, image_url),
    ];
  }
}

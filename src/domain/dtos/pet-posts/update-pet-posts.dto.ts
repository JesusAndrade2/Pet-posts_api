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
    string('pet_name is not in format required'),
    minLength(3, 'pet_name must be at least 3 characters long'),
    maxLength(70, 'pet_name must be at most 70 characters long')
  ),

  description: pipe(
    string('description is not in format required'),
    minLength(10, 'description must be at least 10 characters long'),
    maxLength(1000, 'description must be at most 1000 characters long')
  ),

  image_url: pipe(
    string('image_url is not in format required'),
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

    if (!('pet_name' in input)) {
      return ['pet_name is required'];
    }
    if (!('description' in input)) {
      return ['description is required'];
    }
    if (!('hasFound' in input)) {
      return ['hasFound is required'];
    }
    if (!('image_url' in input)) {
      return ['image_url is required'];
    }

    if (!result.success) {
      const error = result.issues[0]?.message ?? 'validation failed';
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

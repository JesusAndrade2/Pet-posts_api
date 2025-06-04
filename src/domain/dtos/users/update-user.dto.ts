import {
  email,
  maxLength,
  minLength,
  nonEmpty,
  object,
  pipe,
  safeParse,
  string,
} from 'valibot';

export const UpdateUserSchema = object({
  name: pipe(
    string('name is not format required'),
    minLength(3, 'name must be at least 3 characters long'),
    maxLength(70, 'name must be at most 70 characters long')
  ),

  email: pipe(
    string('email is not format required'),
    nonEmpty('please enter your email'),
    email('the email addres is badly formatted')
  ),
});

export class UpdateUserDto {
  constructor(public readonly name: string, public readonly email: string) {}

  static execute(input: { [key: string]: any }): [string?, UpdateUserDto?] {
    if (!('email' in input)) {
      return ['email is required'];
    }
    if (!('name' in input)) {
      return ['name is required'];
    }
    const result = safeParse(UpdateUserSchema, input);

    if (!result.success) {
      const error = result.issues[0]?.message ?? 'validation failed';
      return [error];
    }

    const { name, email } = result.output as {
      name: string;
      email: string;
    };

    return [undefined, new UpdateUserDto(name, email)];
  }
}

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

export const RegisterUserSchema = object({
  name: pipe(
    string('name is required'),
    minLength(3, 'name must be at least 3 characters long'),
    maxLength(70, 'name must be at most 70 characters long')
  ),

  password: pipe(
    string('password is required'),
    nonEmpty('please enter your password'),
    minLength(8, 'password must be at least 8 characters long')
  ),

  email: pipe(
    string('password is required'),
    nonEmpty('please enter your email'),
    email('the email addres is badly formatted')
  ),
});

export class RegisterUserDto {
  constructor(
    public readonly name: string,
    public readonly password: string,
    public readonly email: string
  ) {}

  static execute(input: { [key: string]: any }): [string?, RegisterUserDto?] {
    const result = safeParse(RegisterUserSchema, input);

    if (!result.success) {
      const error = result.issues[0]?.message ?? 'validacion failed';
      return [error];
    }

    const { name, password, email } = result.output as {
      name: string;
      password: string;
      email: string;
    };

    return [undefined, new RegisterUserDto(name, password, email)];
  }
}

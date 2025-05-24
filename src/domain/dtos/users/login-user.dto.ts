import {
  email,
  minLength,
  nonEmpty,
  object,
  pipe,
  safeParse,
  string,
} from 'valibot';

export const LoginUserSchema = object({
  email: pipe(
    string('password is required'),
    nonEmpty('please enter your email'),
    email('the email addres is badly formatted')
  ),
  password: pipe(
    string('password is required'),
    nonEmpty('please enter your password'),
    minLength(8, 'password must be at least 8 characters long')
  ),
});

export class LoginUserDto {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static execute(input: { [key: string]: any }): [string?, LoginUserDto?] {
    const result = safeParse(LoginUserSchema, input);

    if (!result.success) {
      const error = result.issues[0]?.message ?? 'validacion failed';
      return [error];
    }

    const { email, password } = result.output as {
      email: string;
      password: string;
    };

    return [undefined, new LoginUserDto(email, password)];
  }
}

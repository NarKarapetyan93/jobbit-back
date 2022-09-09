export class CreateUserDto {
  readonly firstname: string;
  readonly lastname: string;
  readonly avatar: string;
  readonly email: string;
  readonly password: string;
  readonly refreshToken: string;
}

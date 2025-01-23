import { IsNotEmpty, IsString } from 'class-validator'

export default class SignInDto {
  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}

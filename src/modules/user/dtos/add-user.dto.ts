import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AddUserInputDto {
  @IsNotEmpty()
  @IsString()
  email: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsNumber()
  roleId: number
}

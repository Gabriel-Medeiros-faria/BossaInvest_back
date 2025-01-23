import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AddRoleInputDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  key: string
}

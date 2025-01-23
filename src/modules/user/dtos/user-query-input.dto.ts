import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UserQueryInputDto {
  @IsNumber()
  @IsOptional()
  id?: number

  @IsString()
  @IsOptional()
  email?: string

  @IsNumber()
  @IsOptional()
  roleId?: number
}

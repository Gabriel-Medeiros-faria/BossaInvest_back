import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateUserInputDto {
  @IsNotEmpty()
  @IsNumber()
  id: number

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  password?: string
}

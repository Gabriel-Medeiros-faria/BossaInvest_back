import { IsNumber, IsOptional, IsString } from 'class-validator'
import { UserDto } from './user.dto'

export class UserPasswordDto extends UserDto {
  @IsString()
  password: string
}

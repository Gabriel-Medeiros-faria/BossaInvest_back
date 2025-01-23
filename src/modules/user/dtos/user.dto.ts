import { isNumber, IsNumber, IsObject, IsOptional, IsString } from 'class-validator'
import { Role } from 'src/modules/authorization/role.decorator'
import { RoleDto } from 'src/modules/role/dtos/role.dto'

export class UserDto {
  @IsNumber()
  id: number

  @IsString()
  email: string

  @IsString()
  name: string

  @IsNumber()
  roleId: number

  @IsObject()
  role: RoleDto
}

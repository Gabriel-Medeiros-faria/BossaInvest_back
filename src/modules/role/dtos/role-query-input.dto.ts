import { IsNumber, IsString } from 'class-validator'

export class RoleQueryInputDto {
  @IsNumber()
  id?: number

  @IsString()
  key?: string
}

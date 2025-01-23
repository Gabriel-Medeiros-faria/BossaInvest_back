import { IsNumber, IsString } from 'class-validator'

export class WalletQueryInputDto {
  @IsNumber()
  id?: number

  @IsString()
  name?: string

  @IsNumber()
  userId?: number
}

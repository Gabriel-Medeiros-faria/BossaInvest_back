import { IsDate, IsNumber, IsString } from 'class-validator'

export class AddWalletInputDto {
  @IsString()
  name: string

  @IsNumber()
  userId: number
}

import { IsDate, IsNumber, IsString } from 'class-validator'

export class WalletDto {
  @IsNumber()
  id: number

  @IsString()
  name: string

  @IsDate()
  createdAt: Date

  @IsDate()
  updatedAt: Date

  @IsNumber()
  userId: number
}

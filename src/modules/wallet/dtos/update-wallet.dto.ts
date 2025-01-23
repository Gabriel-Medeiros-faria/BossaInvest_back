import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateWalletInputDto {
  @IsNotEmpty()
  @IsNumber()
  id: number

  @IsOptional()
  @IsString()
  name: string
}

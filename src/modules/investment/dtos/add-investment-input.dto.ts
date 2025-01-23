import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AddInvestmentInputDto {

  @IsNumber()
  @IsNotEmpty()
  amount: number

  @IsNumber()
  @IsNotEmpty()
  walletId: number

  @IsNumber()
  @IsNotEmpty()
  availableInvestmentId: number;
}

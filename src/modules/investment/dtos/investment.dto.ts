import { IsNumber, IsString } from 'class-validator'

export class InvestmentDto {
  @IsNumber()
  id: number

  @IsNumber()
  amount: number

  @IsNumber()
  walletId: number

  @IsNumber()
  availableInvestmentId: number;
}

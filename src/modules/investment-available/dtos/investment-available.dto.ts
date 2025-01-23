import { IsNumber, IsString } from 'class-validator'

export class InvestmentAvailableDto {
  @IsNumber()
  id: number

  @IsString()
  companyName: string

  @IsString()
  sector: string

  @IsString()
  description: string

  @IsNumber()
  minimumInvestment: number
}

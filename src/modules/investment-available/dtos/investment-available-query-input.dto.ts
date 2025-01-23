import { IsNumber, IsString } from 'class-validator'

export class InvestmentAvailableQueryInputDto {
  @IsNumber()
  id?: number

  @IsString()
  companyName?: string
}

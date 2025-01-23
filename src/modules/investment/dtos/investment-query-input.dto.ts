import { IsNumber, IsString } from 'class-validator'

export class InvestmentQueryInputDto {
  @IsNumber()
  id?: number
}

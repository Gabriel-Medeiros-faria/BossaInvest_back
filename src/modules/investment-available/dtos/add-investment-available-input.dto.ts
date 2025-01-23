import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AddInvestmentAvailableInputDto {

  @IsString()
  @IsNotEmpty()
  companyName: string

  @IsString()
  @IsNotEmpty()
  sector: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsNumber()
  @IsNotEmpty()
  minimumInvestment: number
}

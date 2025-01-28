import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { InvestmentQueryInputDto } from './dtos/investment-query-input.dto';
import { AddInvestmentInputDto } from './dtos/add-investment-input.dto';
import { AuthorizationGuard } from '../authorization/authorization.guard';

@UseGuards(AuthorizationGuard)
@Controller('investment')
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}


  @Get()
  async getInvestments(@Query() query: InvestmentQueryInputDto) {
    return this.investmentService.investments(query);
  }


  @Post()
  async addInvestment(@Body() investmentData: AddInvestmentInputDto) {
    return this.investmentService.addInvestment(investmentData);
  }

  @Delete(':id')
  async deleteInvestment(@Param('id') investmentId: number) {
    return this.investmentService.deleteInvestment(investmentId);
  }
}

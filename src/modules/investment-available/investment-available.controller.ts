import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { InvestmentAvailableService } from './investment-available.service';
import { AuthorizationGuard } from '../authorization/authorization.guard';
import { AddInvestmentAvailableInputDto } from './dtos/add-investment-available-input.dto';


@UseGuards(AuthorizationGuard)
@Controller('investment-available')
export class InvestmentAvailableController {
    constructor(private investmentAvailableService: InvestmentAvailableService) {}

    
    @Get()
    async getInvestmentAvailable(){
        return this.investmentAvailableService.investments()
    }

    @Post()
    async createInvestmentAvailable(@Body() investmentAvailable: AddInvestmentAvailableInputDto){
        return this.investmentAvailableService.addInvestment(investmentAvailable)
    }

}

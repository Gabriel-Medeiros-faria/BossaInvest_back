import { BadRequestException, Injectable } from '@nestjs/common'
import { InvestmentQueryInputDto } from './dtos/investment-query-input.dto'
import { InvestmentDto } from './dtos/investment.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { InvestmentEntity } from './investment.entity'
import { Repository } from 'typeorm'
import { AddInvestmentInputDto } from './dtos/add-investment-input.dto'

@Injectable()
export class InvestmentService {
  constructor(
    @InjectRepository(InvestmentEntity)
    private readonly investmentRepository: Repository<InvestmentEntity>,
  ) {}

  async investments(filter?: InvestmentQueryInputDto): Promise<InvestmentDto[]> {
    const filters: { where: InvestmentQueryInputDto } = { where: {} }

    if (filter?.id) {
      filters.where.id = filter.id
    }

    return (await this.investmentRepository.find(filters)).map(
      (inv) => inv as unknown as InvestmentDto,
    )
  }

  async addInvestment(newInvestment: AddInvestmentInputDto): Promise<InvestmentDto> {
    const investment = new InvestmentEntity()

    investment.amount = newInvestment.amount
    investment.walletId = newInvestment.walletId
    investment.availableInvestmentId = newInvestment.availableInvestmentId

    return await this.investmentRepository.save(investment)
  }

  async deleteInvestment(investmentId: number) {
    const investment = await this.investmentRepository.findOne({ where: { id: investmentId } });

    if (!investment) {
      throw new Error('Investimento não encontrado');
    }


    await this.investmentRepository.remove(investment);

    return { message: 'Investimento deletado com sucesso' };
  }
}

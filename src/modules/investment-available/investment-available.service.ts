import { BadRequestException, Injectable } from '@nestjs/common'
import { InvestmentAvailableQueryInputDto } from './dtos/investment-available-query-input.dto'
import { InvestmentAvailableDto } from './dtos/investment-available.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { AvailableInvestmentEntity } from './investmentAvailable.entity'
import { Repository } from 'typeorm'
import { AddInvestmentAvailableInputDto } from './dtos/add-investment-available-input.dto'

@Injectable()
export class InvestmentAvailableService {
  constructor(
    @InjectRepository(AvailableInvestmentEntity)
    private readonly investmentAvailableRepository: Repository<AvailableInvestmentEntity>,
  ) {}

  async investments(filter?: InvestmentAvailableQueryInputDto): Promise<InvestmentAvailableDto[]> {
    const filters: { where: InvestmentAvailableQueryInputDto } = { where: {} }

    if (filter?.id) {
      filters.where.id = filter.id
    }
    if (filter?.companyName) {
      filters.where.companyName = filter.companyName
    }


    return (await this.investmentAvailableRepository.find(filters)).map((inv) => inv as unknown as InvestmentAvailableDto)
  }

  async addInvestment(newInvestmentAvailable: AddInvestmentAvailableInputDto): Promise<InvestmentAvailableDto> {
    const investmentAvailableExist = (await this.investments({ companyName: newInvestmentAvailable.companyName }))[0]
    if (investmentAvailableExist) {
      throw new BadRequestException(`You cannot add this investment-available. Please try again later.`)
    }
    const investmentAvailable = new AvailableInvestmentEntity()

    investmentAvailable.companyName = newInvestmentAvailable.companyName
    investmentAvailable.description = newInvestmentAvailable.description
    investmentAvailable.minimumInvestment = newInvestmentAvailable.minimumInvestment
    investmentAvailable.sector = newInvestmentAvailable.sector

    return await this.investmentAvailableRepository.save(investmentAvailable)
  }

  /* async deleteRole(): Promise<DeleteResult> {
    const investmentAvailableExist = (await this.roles({ key: newInvestmentAvailable.key }))[0]

    if (investmentAvailableExist) {
      throw new BadRequestException(`You cannot add this role. Please try again later.`)
    }

    const role = new AvailableInvestmentEntity()

    role.name = newRole.name
    role.key = newRole.key

    return await this.investmentAvailableRepository.delete({id:4})
  } */
}

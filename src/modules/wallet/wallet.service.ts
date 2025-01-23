import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { WalletEntity } from './wallet.entity'
import { WalletQueryInputDto } from './dtos/wallet-query-input'
import { WalletDto } from './dtos/wallet-dto'
import { AddWalletInputDto } from './dtos/add-wallet-input'
import { UpdateWalletInputDto } from './dtos/update-wallet.dto'

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>,
  ) {}

  async wallets(filter?: WalletQueryInputDto): Promise<WalletDto[]> {
    const filters: { where: WalletQueryInputDto; relations?: string[] } = { where: {} }

    if (filter?.id) {
      filters.where.id = filter.id
    }

    if (filter?.name) {
      filters.where.name = filter.name
    }

    if (filter?.userId) {
      filters.where.userId = filter.userId
    }

    filters.relations = ['investments', 'investments.availableInvestment']

    return (await this.walletRepository.find(filters)).map((wa) => wa as unknown as WalletDto)
  }

  async addWallet(newWallet: AddWalletInputDto): Promise<WalletDto> {
    const walletExist = (await this.wallets({ name: newWallet.name }))[0]

    if (walletExist) {
      throw new BadRequestException(`You cannot add this wallet. Please try again later.`)
    }

    const wallet = new WalletEntity()

    wallet.name = newWallet.name
    wallet.userId = newWallet.userId

    return await this.walletRepository.save(wallet)
  }

  async updateWallet(wallet: UpdateWalletInputDto): Promise<WalletDto> {
    const walletExists = (await this.wallets({ id: wallet.id }))[0] as WalletDto

    if (!walletExists) {
      throw new NotFoundException(`User with this ID does not exist.`)
    }

    if (wallet.name) walletExists.name = wallet.name

    return await this.walletRepository.save(walletExists)
  }

  async deleteWallet(id: number): Promise<DeleteResult> {
    const wallet = await this.walletRepository.findOneBy({ id })

    if (!wallet) {
      throw new NotFoundException('Carteira não encontrada')
    }

    const respWallet = await this.walletRepository.delete(id)
    return respWallet
  }
}

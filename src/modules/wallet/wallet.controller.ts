import { Body, Controller, Get, Post, UseGuards, Patch, Req, Delete, Param, Request } from '@nestjs/common'
import { WalletService } from './wallet.service'
import { AuthorizationGuard } from '../authorization/authorization.guard'
import { AddWalletInputDto } from './dtos/add-wallet-input'
import { UpdateWalletInputDto } from './dtos/update-wallet.dto'
import { Public } from 'src/resources/decorators/authentication.guard.decorator'

@UseGuards(AuthorizationGuard)
@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post()
  @Public()
  async addWallet(@Body() wallet: AddWalletInputDto) {
    return this.walletService.addWallet(wallet)
  }

  @Get(':id')
  @Public()
  async getWallet(@Param('id') id: number) {
    return this.walletService.wallets({userId: id})
  }

  @Patch()
  async updateWallet(@Body() wallet: UpdateWalletInputDto) {
    return this.walletService.updateWallet(wallet)
  }

  @Delete(':id')
  async deleteWallet(@Param('id') id: number) {
    return this.walletService.deleteWallet(id);
  }
}

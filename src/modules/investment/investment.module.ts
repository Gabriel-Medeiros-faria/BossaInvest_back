import { forwardRef, Module } from '@nestjs/common'
import { InvestmentService } from './investment.service'
import { InvestmentController } from './investment.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthorizationModule } from '../authorization/authorization.module'
import { WalletEntity } from '../wallet/wallet.entity'
import { AvailableInvestmentEntity } from '../investment-available/investmentAvailable.entity'
import { InvestmentEntity } from './investment.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([WalletEntity, AvailableInvestmentEntity, InvestmentEntity]),
    forwardRef(() => AuthorizationModule),
  ],
  providers: [InvestmentService],
  controllers: [InvestmentController],
})
export class InvestmentModule {}

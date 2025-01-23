import { forwardRef, Module } from '@nestjs/common';
import { InvestmentAvailableController } from './investment-available.controller';
import { InvestmentAvailableService } from './investment-available.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from '../wallet/wallet.entity';
import { AvailableInvestmentEntity } from './investmentAvailable.entity';
import { InvestmentEntity } from '../investment/investment.entity';
import { AuthorizationModule } from '../authorization/authorization.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([WalletEntity, AvailableInvestmentEntity, InvestmentEntity]),
      forwardRef(() => AuthorizationModule),
    ],
  controllers: [InvestmentAvailableController],
  providers: [InvestmentAvailableService]
})
export class InvestmentAvailableModule {}

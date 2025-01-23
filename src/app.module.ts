import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModule } from './modules/user/user.module'
import { AuthenticationModule } from './modules/authentication/authentication.module'
import { AuthorizationModule } from './modules/authorization/authorization.module'
import { RoleModule } from './modules/role/role.module'
import { InvestmentModule } from './modules/investment/investment.module';
import { InvestmentAvailableModule } from './modules/investment-available/investment-available.module';

import appConfig from '../config/app.config'
import dbConfig from '../config/database.config'
import { WalletModule } from './modules/wallet/wallet.module'

const env = process.env.ENV || 'development'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.ENV_FILE || `./config/.env.${env}`,
      load: [appConfig, dbConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<'mysql' | 'postgres' | 'mongodb'>('database.type', 'mysql'),
        host: configService.get<string>('database.host', 'localhost'),
        port: configService.get<number>('database.port', 3306),
        username: configService.get<string>('database.username', 'root'),
        password: configService.get<string>('database.password', 'root'),
        database: configService.get<string>('database.database', 'test'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    UserModule,
    AuthenticationModule,
    AuthorizationModule,
    RoleModule,
    WalletModule,
    InvestmentModule,
    InvestmentAvailableModule,
  ],
  controllers: []
})
export class AppModule {}

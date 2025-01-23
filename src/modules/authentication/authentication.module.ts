import { Module } from '@nestjs/common'
import { AuthenticationController } from './authentication.controller'
import { AuthenticationService } from './authentication.service'
import { UserModule } from '../user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthenticationGuard } from './authentication.guard'
import { JwtStrategy } from './authentication.strategy'

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('app.jwtSecret'),
        signOptions: { expiresIn: '6h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AuthenticationGuard, JwtStrategy],
})
export class AuthenticationModule {}

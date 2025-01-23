import { Test, TestingModule } from '@nestjs/testing'
import { AuthenticationService } from './authentication.service'
import { UserModule } from '../user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { AuthenticationController } from './authentication.controller'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../user/user.entity'
import { RoleEntity } from '../role/role.entity'

describe('AuthenticationService', () => {
  let service: AuthenticationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        JwtModule,
        ConfigModule.forRoot({
          envFilePath: `./tests/test.env`,
          isGlobal: true,
        }),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [UserEntity, RoleEntity],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([UserEntity, RoleEntity]),
      ],
      controllers: [AuthenticationController],
      providers: [AuthenticationService],
    }).compile()

    service = module.get<AuthenticationService>(AuthenticationService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

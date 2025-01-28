import { Test, TestingModule } from '@nestjs/testing'
import { AuthorizationService } from './authorization.service'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../user/user.entity'
import { RoleEntity } from '../role/role.entity'
import { UserModule } from '../user/user.module'

describe('AuthorizationService', () => {
  let service: AuthorizationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
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
        UserModule,
      ],
      providers: [AuthorizationService],
    }).compile()

    service = module.get<AuthorizationService>(AuthorizationService)
  })

  it(
    'should be defined',
    () => {
      expect(service).toBeDefined();
    },
    10000 
  );
})

import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { RoleEntity } from '../role/role.entity'
import { forwardRef } from '@nestjs/common'
import { AuthorizationModule } from '../authorization/authorization.module'

jest.setTimeout(10000); // Aumenta o timeout para 10 segundos

describe('UsersService', () => {
  let service: UserService;

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
        forwardRef(() => AuthorizationModule),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

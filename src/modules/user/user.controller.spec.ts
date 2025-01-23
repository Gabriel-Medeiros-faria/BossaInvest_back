import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { RoleEntity } from '../role/role.entity'
import { UserService } from './user.service'
import { forwardRef } from '@nestjs/common'
import { AuthorizationModule } from '../authorization/authorization.module'

describe('UserController', () => {
  let controller: UserController

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
      controllers: [UserController],
      providers: [UserService],
    }).compile()

    controller = module.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})

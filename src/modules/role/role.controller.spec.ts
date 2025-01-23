import { Test, TestingModule } from '@nestjs/testing'
import { RoleController } from './role.controller'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../user/user.entity'
import { RoleEntity } from './role.entity'
import { RoleService } from './role.service'

describe('RoleController', () => {
  let controller: RoleController

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
      ],
      controllers: [RoleController],
      providers: [RoleService],
    }).compile()

    controller = module.get<RoleController>(RoleController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})

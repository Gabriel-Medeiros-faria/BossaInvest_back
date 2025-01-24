import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { RoleEntity } from './role.entity';

describe('UserRoleService', () => {
  let service: RoleService;

  // Usando beforeAll para configurar o módulo apenas uma vez
  beforeAll(async () => {
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
          synchronize: true, // Pode alterar para false se não precisar de sincronização
        }),
        TypeOrmModule.forFeature([UserEntity, RoleEntity]),
      ],
      providers: [RoleService],
    }).compile();

    service = module.get<RoleService>(RoleService);
  });

  // Teste com timeout estendido para 10 segundos
  it(
    'should be defined',
    () => {
      expect(service).toBeDefined();
    },
    10000 // Aumenta o timeout para 10 segundos
  );
});

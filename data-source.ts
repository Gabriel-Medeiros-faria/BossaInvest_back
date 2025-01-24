import 'reflect-metadata';
import { AvailableInvestmentEntity } from 'src/modules/investment-available/investmentAvailable.entity';
import { InvestmentEntity } from 'src/modules/investment/investment.entity';
import { RoleEntity } from 'src/modules/role/role.entity';
import { UserEntity } from 'src/modules/user/user.entity';
import { WalletEntity } from 'src/modules/wallet/wallet.entity';
import { DataSource } from 'typeorm';


const AppDataSource = new DataSource({
  type: 'postgres', // ou outro banco (mysql, sqlite, etc.)
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '12345',
  database: process.env.DB_DATABASE || 'bossaInvest',
  entities: [
    UserEntity,
    RoleEntity,
    WalletEntity,
    InvestmentEntity,
    AvailableInvestmentEntity,
  ],
  migrations: ['./src/migration/*.ts'], // Certifique-se de que está correto
  synchronize: false, // Evite 'true' em produção
  logging: true,
});

export { AppDataSource }; // Apenas esta exportação deve existir!

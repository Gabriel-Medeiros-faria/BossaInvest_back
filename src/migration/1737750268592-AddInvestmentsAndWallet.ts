import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddInvestmentsAndWallet1737750268592 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`
          CREATE TABLE IF NOT EXISTS role (
            id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            key VARCHAR NOT NULL
          );
        `)

    await queryRunner.query(`
          CREATE TABLE IF NOT EXISTS "user" (
            id SERIAL PRIMARY KEY,
            email VARCHAR NOT NULL UNIQUE,
            name VARCHAR NOT NULL,
            password VARCHAR NOT NULL,
            role_id INTEGER NOT NULL,
            CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE
          );
        `)


    await queryRunner.query(`
          CREATE TABLE IF NOT EXISTS wallet (
            id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            user_id INTEGER NOT NULL,
            CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE
          );
        `)

    await queryRunner.query(`
          CREATE TABLE IF NOT EXISTS investment_available (
            id SERIAL PRIMARY KEY,
            company_name VARCHAR NOT NULL,
            sector VARCHAR NOT NULL,
            description TEXT NOT NULL,
            minimum_investment DECIMAL(15, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `)


    await queryRunner.query(`
          CREATE TABLE IF NOT EXISTS investment (
            id SERIAL PRIMARY KEY,
            amount DECIMAL(15, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            wallet_id INTEGER NOT NULL,
            available_investment_id INTEGER NOT NULL,
            CONSTRAINT fk_wallet FOREIGN KEY (wallet_id) REFERENCES wallet (id) ON DELETE CASCADE,
            CONSTRAINT fk_available_investment FOREIGN KEY (available_investment_id) REFERENCES investment_available (id) ON DELETE CASCADE
          );
        `)

    await queryRunner.query(`
          INSERT INTO role (name, key) VALUES
          ('Investidor', 'investidor');
        `)


    await queryRunner.query(`
          INSERT INTO investment_available (company_name, sector, description, minimum_investment) VALUES
          ('Empresa A', 'Tecnologia', 'Descrição da Empresa A', 100.00),
          ('Empresa B', 'Financeiro', 'Descrição da Empresa B', 200.00),
          ('Empresa C', 'Imobiliário', 'Descrição da Empresa C', 300.00),
          ('Empresa D', 'Criptoativos', 'Descrição da Empresa D', 400.00),
          ('Empresa E', 'Investimentos', 'Descrição da Empresa E', 500.00),
          ('Empresa F', 'Infraestrutura', 'Descrição da Empresa F', 600.00);
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`
          DELETE FROM investment_available WHERE company_name IN (
            'Empresa A', 'Empresa B', 'Empresa C', 'Empresa D', 'Empresa E', 'Empresa F'
          );
        `)


    await queryRunner.query(`
          DELETE FROM role WHERE name = 'Investidor';
        `)


    await queryRunner.query(`DROP TABLE IF EXISTS investment;`)


    await queryRunner.query(`DROP TABLE IF EXISTS investment_available;`)

    await queryRunner.query(`DROP TABLE IF EXISTS wallet;`)


    await queryRunner.query(`DROP TABLE IF EXISTS "user";`)

    await queryRunner.query(`DROP TABLE IF EXISTS role;`)
  }
}

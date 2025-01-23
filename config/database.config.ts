import { registerAs } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export default registerAs('database', (): TypeOrmModuleOptions => {
  const type = process.env.DB_TYPE
    ? (process.env.DB_TYPE?.toLocaleLowerCase() as 'mysql' | 'postgres' | 'mongodb')
    : 'mysql'

  return {
    type,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT ?? '3306'),
    username: process.env.DB_USER || 'user',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_DATABASE || 'database',
  }
})

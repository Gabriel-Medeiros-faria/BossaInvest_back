import { registerAs } from '@nestjs/config'

export default registerAs('app', () => ({
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT as string, 10) || 5000,
  jwtSecret: process.env.JWT_SECRET,
  corsAllowedOrigins: process.env.CORS_ALLOWED_ORIGINS
    ? process.env.CORS_ALLOWED_ORIGINS.split(',').filter(Boolean)
    : ['localhost:3000'],
}))

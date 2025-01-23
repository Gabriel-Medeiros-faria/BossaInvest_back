import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthenticationGuard } from './modules/authentication/authentication.guard'
import { AuthorizationGuard } from './modules/authorization/authorization.guard'

async function bootstrap() {
  const logger = new Logger('NestApplication')

  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  const configService = app.get(ConfigService)
  const reflector = app.get(Reflector)

  const { port, corsAllowedOrigins } = configService.get('app')

  app.enableCors({
    origin: corsAllowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))
  app.useGlobalGuards(new AuthenticationGuard(reflector))

  await app.listen(port, () => {
    logger.log(`Application is listening on port ${port}`)
  })
}
bootstrap()

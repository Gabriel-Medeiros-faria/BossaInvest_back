import { forwardRef, Module } from '@nestjs/common'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { UserController } from './user.controller'
import { AuthorizationModule } from '../authorization/authorization.module'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), forwardRef(() => AuthorizationModule)],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}



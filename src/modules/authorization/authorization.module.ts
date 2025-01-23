import { forwardRef, Module } from '@nestjs/common'
import { AuthorizationService } from './authorization.service'
import { UserModule } from '../user/user.module'

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [AuthorizationService],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}

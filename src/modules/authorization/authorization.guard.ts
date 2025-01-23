import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthorizationService } from './authorization.service'
import { ROLES_KEY } from './role.decorator'

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authorizationService: AuthorizationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.get<string>(ROLES_KEY, context.getHandler())
    if (!requiredRole) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user) {
      throw new UnauthorizedException()
    }

    const hasPrivilege = await this.authorizationService.userHasRole(user.id, requiredRole)
    if (!hasPrivilege) {
      throw new UnauthorizedException('User does not have the required role')
    }

    return true
  }
}

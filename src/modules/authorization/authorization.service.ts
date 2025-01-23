import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { log } from 'console'

@Injectable()
export class AuthorizationService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async userHasRole(userId, requiredRoleKey) {
    const user = (await this.userService.users({ id: userId }))[0]

    if (!user) return false

    return user.role.key === requiredRoleKey
  }
}

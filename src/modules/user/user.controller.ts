import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common'
import { AddUserInputDto } from './dtos/add-user.dto'
import { UserService } from './user.service'
import { AuthorizationGuard } from '../authorization/authorization.guard'
import { Public } from '../../resources/decorators/authentication.guard.decorator'
import { UpdateUserInputDto } from './dtos/update-user.dto'

@UseGuards(AuthorizationGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @Public()
  async addUser(@Body() user: AddUserInputDto) {
    return await this.userService.addUser(user)
  }

  @Get()
  @Public()
  async getUsers() {
    return await this.userService.users()
  }

  @Patch()
  async updateUser(@Body() user: UpdateUserInputDto) {
    return await this.userService.updateUser(user)
  }
}
